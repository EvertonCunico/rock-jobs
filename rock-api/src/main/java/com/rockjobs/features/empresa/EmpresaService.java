package com.rockjobs.features.empresa;

import com.rockjobs.core.crud_base.ServiceBase;
import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.features.empresa.eventos.ValoresPadraoEvent;
import com.rockjobs.features.empresa.validacoes.ValidaDuplicidade;
import com.rockjobs.features.empresa.validacoes.ValidaExclusao;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@RequestScoped
public class EmpresaService implements ServiceBase<Empresa, Long>, PanacheRepositoryBase<Empresa, Long> {
	@Inject
	EntityManager em;

	@Inject
	ValoresPadraoEvent valoresPadraoEvent;

	@Inject
	ValidaDuplicidade validaDuplicidade;

	@Inject
	ValidaExclusao validaExclusao;

	@Override
	public List<Class<? extends EventoPadrao<Empresa>>> eventosExecutarAntes() {
		return List.of(ValoresPadraoEvent.class);
	}

	@Override
	public List<Class<? extends EventoPadrao<Empresa>>> eventosExecutarDepois() {
		return Collections.emptyList();
	}

	@Override
	public List<Class<? extends ValidacaoPadrao<Empresa>>> validacoes() {
		return List.of(ValidaExclusao.class, ValidaDuplicidade.class);
	}

	@Transactional
	public Empresa novo(Empresa empresa) throws Exception {
		this.preOperacao(AcaoCrud.CREATE, empresa);
		em.persist(empresa);
		this.posOperacao(AcaoCrud.CREATE, empresa);
		return empresa;
	}

	@Transactional
	public Empresa alterar(Empresa empresaAlterar) throws Exception {
		Empresa c = Empresa.findById(empresaAlterar.getId());
		c.setId(empresaAlterar.getId());
		c.setRazaoSocial(empresaAlterar.getRazaoSocial());
		c.setNomeFantasia(empresaAlterar.getNomeFantasia());
		c.setCnpj(empresaAlterar.getCnpj());
		c.setInscricaoEstadual(empresaAlterar.getInscricaoEstadual());
		c.setTelefone(empresaAlterar.getTelefone());
		c.setEmail(empresaAlterar.getEmail());
		c.setEndereco(empresaAlterar.getEndereco());
		c.setEnderecoNumero(empresaAlterar.getEnderecoNumero());
		c.setEnderecoBairro(empresaAlterar.getEnderecoBairro());
		c.setEnderecoCep(empresaAlterar.getEnderecoCep());
		c.setCidade(empresaAlterar.getCidade());
		c.setNumeroDeColaboradores(empresaAlterar.getNumeroDeColaboradores());
		c.setAreaDeAtuacao(empresaAlterar.getAreaDeAtuacao());
		c.setRamoDeAtuacao(empresaAlterar.getRamoDeAtuacao());
		c.setResponsavelRH(empresaAlterar.getResponsavelRH());
		c.setTelefoneResponsavelRH(empresaAlterar.getTelefoneResponsavelRH());
		c.setResponsavelEmpresa(empresaAlterar.getResponsavelEmpresa());
		c.setTelefoneResponsavelEmpresa(empresaAlterar.getTelefoneResponsavelEmpresa());
		c.setComplemento(empresaAlterar.getComplemento());
		this.preOperacao(AcaoCrud.UPDATE, c);
		em.merge(c);
		this.posOperacao(AcaoCrud.UPDATE, c);
		return c;
	}

	@Transactional
	public void deletar(Long id) throws Exception {
		Empresa empresa = Empresa.findById(id);
		preOperacao(AcaoCrud.DELETE, empresa);
		empresa.delete();
		posOperacao(AcaoCrud.DELETE, empresa);
	}

	@Override
	public Empresa buscarPorId(Long id) throws Exception {
		return Empresa.findById(id);
	}

	public List<Empresa> buscarTodos() throws Exception {
		return Empresa.listAll();
	}
}