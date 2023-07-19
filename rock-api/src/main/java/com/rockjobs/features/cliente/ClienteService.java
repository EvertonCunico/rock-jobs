package com.rockjobs.features.cliente;

import com.rockjobs.core.crud_base.ServiceBase;
import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.security.PasswordUtil;
import com.rockjobs.core.security.service.Logado;
import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.core.usuario.dto.AlteracaoSenha;
import com.rockjobs.core.usuario.dto.UsuarioDto;
import com.rockjobs.core.usuario.eventos.CriptografarSenhaEvent;
import com.rockjobs.core.usuario.validacoes.ValidaDuplicidadeUsuario;
import com.rockjobs.features.cliente.eventos.ValoresPadraoEvent;
import com.rockjobs.features.cliente.validacoes.ValidaDuplicidadeCliente;
import com.rockjobs.features.cliente.validacoes.ValidaExclusaoCliente;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@RequestScoped
public class ClienteService implements ServiceBase<Cliente, Long>, PanacheRepositoryBase<Cliente, Long> {
	@Inject
	EntityManager em;

	@Inject
	ValoresPadraoEvent valoresPadraoEvent;

	@Inject
	ValidaDuplicidadeCliente validaDuplicidadeCliente;

	@Inject
	ValidaExclusaoCliente validaExclusaoCliente;

	@Override
	public List<Class<? extends EventoPadrao<Cliente>>> eventosExecutarAntes() {
		return List.of(ValoresPadraoEvent.class);
	}

	@Override
	public List<Class<? extends EventoPadrao<Cliente>>> eventosExecutarDepois() {
		return Collections.emptyList();
	}

	@Override
	public List<Class<? extends ValidacaoPadrao<Cliente>>> validacoes() {
		return List.of(ValidaExclusaoCliente.class, ValidaDuplicidadeCliente.class);
	}

	@Transactional
	public Cliente novo(Cliente cliente) throws Exception {
		this.preOperacao(AcaoCrud.CREATE, cliente);
		em.persist(cliente);
		this.posOperacao(AcaoCrud.CREATE, cliente);
		return cliente;
	}

	@Transactional
	public Cliente alterar(Cliente clienteAlterar) throws Exception {
		Cliente c = Cliente.findById(clienteAlterar.getId());
		c.setId(clienteAlterar.getId());
		c.setRazaoSocial(clienteAlterar.getRazaoSocial());
		c.setNomeFantasia(clienteAlterar.getNomeFantasia());
		c.setCnpj(clienteAlterar.getCnpj());
		c.setInscricaoEstadual(clienteAlterar.getInscricaoEstadual());
		c.setTelefone(clienteAlterar.getTelefone());
		c.setEmail(clienteAlterar.getEmail());
		c.setEndereco(clienteAlterar.getEndereco());
		c.setEnderecoNumero(clienteAlterar.getEnderecoNumero());
		c.setEnderecoBairro(clienteAlterar.getEnderecoBairro());
		c.setEnderecoCep(clienteAlterar.getEnderecoCep());
		c.setCidade(clienteAlterar.getCidade());
		c.setNumeroDeColaboradores(clienteAlterar.getNumeroDeColaboradores());
		c.setAreaDeAtuacao(clienteAlterar.getAreaDeAtuacao());
		c.setRamoDeAtuacao(clienteAlterar.getRamoDeAtuacao());
		c.setResponsavelRH(clienteAlterar.getResponsavelRH());
		c.setTelefoneResponsavelRH(clienteAlterar.getTelefoneResponsavelRH());
		this.preOperacao(AcaoCrud.UPDATE, c);
		em.merge(c);
		this.posOperacao(AcaoCrud.UPDATE, c);
		return c;
	}

	@Transactional
	public void deletar(Long id) throws Exception {
		Cliente cliente = Cliente.findById(id);
		preOperacao(AcaoCrud.DELETE, cliente);
		cliente.delete();
		posOperacao(AcaoCrud.DELETE, cliente);
	}

	@Override
	public Cliente buscarPorId(Long id) throws Exception {
		return Cliente.findById(id);
	}

	public List<Cliente> buscarTodos() throws Exception {
		return Cliente.listAll();
	}
}