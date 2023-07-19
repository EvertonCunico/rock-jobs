package com.rockjobs.features.vaga;

import com.rockjobs.core.crud_base.ServiceBase;
import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.features.cliente.Cliente;
import com.rockjobs.features.cliente.eventos.ValoresPadraoEvent;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.Collections;
import java.util.List;

@RequestScoped
public class VagaService implements ServiceBase<Vaga, Long>, PanacheRepositoryBase<Vaga, Long> {
	@Inject
	EntityManager em;

	@Inject
	ValoresPadraoEvent valoresPadraoEvent;

	@Override
	public List<Class<? extends EventoPadrao<Vaga>>> eventosExecutarAntes() {
		return List.of();
	}

	@Override
	public List<Class<? extends EventoPadrao<Vaga>>> eventosExecutarDepois() {
		return Collections.emptyList();
	}

	@Override
	public List<Class<? extends ValidacaoPadrao<Vaga>>> validacoes() {
		return List.of();
	}

	@Transactional
	public Vaga novo(Vaga cliente) throws Exception {
		this.preOperacao(AcaoCrud.CREATE, cliente);
		em.persist(cliente);
		this.posOperacao(AcaoCrud.CREATE, cliente);
		return cliente;
	}

	@Transactional
	public Vaga alterar(Vaga clienteAlterar) throws Exception {
		Vaga c = Vaga.findById(clienteAlterar.getId());
		c.setId(clienteAlterar.getId());
		c.setCliente(clienteAlterar.getCliente());
		c.setNomeDaFuncao(clienteAlterar.getNomeDaFuncao());
		c.setQuantidadeDeVagas(clienteAlterar.getQuantidadeDeVagas());
		c.setVagaSigilosa(clienteAlterar.getVagaSigilosa());
		c.setDataLimiteSelecao(clienteAlterar.getDataLimiteSelecao());
		c.setDataLimiteIntegracao(clienteAlterar.getDataLimiteIntegracao());
		c.setAtribuicaoSumaria(clienteAlterar.getAtribuicaoSumaria());
		c.setAtividadesEventuais(clienteAlterar.getAtividadesEventuais());
		c.setAtividadesTipicas(clienteAlterar.getAtividadesTipicas());
		c.setNivelAutoridadeResponsabilidade(clienteAlterar.getNivelAutoridadeResponsabilidade());
		this.preOperacao(AcaoCrud.UPDATE, c);
		em.merge(c);
		this.posOperacao(AcaoCrud.UPDATE, c);
		return c;
	}

	@Transactional
	public void deletar(Long id) throws Exception {
		Vaga cliente = Vaga.findById(id);
		preOperacao(AcaoCrud.DELETE, cliente);
		cliente.delete();
		posOperacao(AcaoCrud.DELETE, cliente);
	}

	@Override
	public Vaga buscarPorId(Long id) throws Exception {
		return Vaga.findById(id);
	}

	public List<Vaga> buscarTodos() throws Exception {
		return Vaga.listAll();
	}
}