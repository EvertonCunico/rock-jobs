package com.rockjobs.core.usuario;

import com.rockjobs.core.crud_base.ServiceBase;
import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.security.PasswordUtil;
import com.rockjobs.core.security.service.Logado;
import com.rockjobs.core.usuario.dto.AlteracaoSenha;
import com.rockjobs.core.usuario.dto.AlteracaoSenhaAdmin;
import com.rockjobs.core.usuario.dto.UsuarioDto;
import com.rockjobs.core.usuario.eventos.CriptografarSenhaEvent;
import com.rockjobs.core.usuario.eventos.ValoresPadraoEvent;
import com.rockjobs.core.usuario.validacoes.ValidaDuplicidadeUsuario;
import com.rockjobs.core.usuario.validacoes.ValoresObrigatorios;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@RequestScoped
public class UsuarioService implements ServiceBase<Usuario, Long>, PanacheRepositoryBase<Usuario, Long> {
	@Inject
	EntityManager em;
	@Inject
	Logado logado;

	@Inject CriptografarSenhaEvent criptografarSenhaEvent;
	@Inject ValoresPadraoEvent valoresPadraoEvent;
	@Inject ValidaDuplicidadeUsuario validaDuplicidadeUsuario;
	@Inject ValoresObrigatorios valoresObrigatorios;

	@Override
	public List<Class<? extends EventoPadrao<Usuario>>> eventosExecutarAntes() {
		return List.of(ValoresPadraoEvent.class, CriptografarSenhaEvent.class);
	}

	@Override
	public List<Class<? extends EventoPadrao<Usuario>>> eventosExecutarDepois() {
		return Collections.emptyList();
	}

	@Override
	public List<Class<? extends ValidacaoPadrao<Usuario>>> validacoes() {
		return List.of(ValidaDuplicidadeUsuario.class, ValoresObrigatorios.class);
	}

	public UsuarioDto novo(UsuarioDto dto) throws Exception {
		var u = dto.mapToUsuario(dto);
		var usuarioDto = new UsuarioDto(this.novo(u));
		return usuarioDto;
	}

	@Transactional
	public Usuario novo(Usuario usuario) throws Exception {
		this.preOperacao(AcaoCrud.CREATE, usuario);
		em.persist(usuario);
		this.posOperacao(AcaoCrud.CREATE, usuario);
		return usuario;
	}

	public UsuarioDto alterar(UsuarioDto dto) throws Exception {
		Usuario u = Usuario.findById(dto.getId());
		u.setId(dto.getId());
		u.setNome(dto.getNome());
		u.setSobrenome(dto.getSobrenome());
		u.setEmail(dto.getEmail());
		u.setEndereco(dto.getEndereco());
		u.setComplemento(dto.getComplemento());
		u.setCpf(dto.getCpf());
		u.setTelefoneCelular(dto.getTelefoneCelular());
		u.setDataNascimento(dto.getDataNascimento());
		u.setAtivo(dto.getAtivo());
		u.setTipoAcesso(dto.getTipoAcesso());
		u.setEmpresa(dto.getEmpresa());
		var usuarioDto = new UsuarioDto(this.alterar(u));
		return usuarioDto;
	}

	@Transactional
	public Usuario alterar(Usuario usuario) throws Exception {
		this.preOperacao(AcaoCrud.UPDATE, usuario);
		em.merge(usuario);
		this.posOperacao(AcaoCrud.UPDATE, usuario);
		return usuario;
	}

	@Transactional
	public void deletar(Long id) throws Exception {
		Usuario usuario = Usuario.findById(id);
		preOperacao(AcaoCrud.DELETE, usuario);
		usuario.delete();
		posOperacao(AcaoCrud.DELETE, usuario);
	}

	@Override
	public Usuario buscarPorId(Long id) throws Exception {
		return Usuario.findById(id);
	}

	public UsuarioDto buscarPorIdDto(Long id) throws Exception {
		Usuario u = Usuario.findById(id);
		if (!TipoAcesso.ADMIN_GERAL.equals(logado.getUsuario().getTipoAcesso()) &&
			logado.getUsuario().getEmpresa() != null &&
			!u.getEmpresa().getId().equals(logado.getUsuario().getEmpresa().getId())) {
			return null;
		}
		return new UsuarioDto(Usuario.findById(id));
	}

	public List<Usuario> buscarTodos() throws Exception {
		return Usuario.listAll();
	}

	public void alterarSenhaUsuario(AlteracaoSenha alteracaoSenha) throws Exception {
		var usuario = Usuario.findByEmailAndAtivo(alteracaoSenha.getLogin());
		if (usuario == null) throw ValidacaoException.builder().status(404).mensagem("Usuário não encontrado.").build();
		if (!PasswordUtil.verifyPassword(alteracaoSenha.getSenhaAtual(), usuario.getSenha())) throw ValidacaoException.builder().status(400).mensagem("Senha atual não confere.").build();
		if (!alteracaoSenha.getSenhaNova().equals(alteracaoSenha.getSenhaConfirmacao())) throw ValidacaoException.builder().status(400).mensagem("A senha de confirmação não coincide com a nova senha.").build();
		usuario.setSenha(PasswordUtil.encryptPassword(alteracaoSenha.getSenhaNova()));
		alterar(usuario);
	}

	public void alterarSenhaUsuario(AlteracaoSenhaAdmin alteracaoSenha) throws Exception {
		Usuario usuario = Usuario.findById(alteracaoSenha.getIdUsuario());
		if (usuario == null) throw ValidacaoException.builder().status(404).mensagem("Usuário não encontrado.").build();
		usuario.setSenha(PasswordUtil.encryptPassword(alteracaoSenha.getSenha()));
		alterar(usuario);
	}
}