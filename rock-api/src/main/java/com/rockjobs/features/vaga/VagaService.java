package com.rockjobs.features.vaga;

import com.rockjobs.core.crud_base.ServiceBase;
import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.security.service.Logado;
import com.rockjobs.features.vaga.eventos.ValoresPadraoEvent;
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
	Logado logado;

	@Inject
	ValoresPadraoEvent valoresPadraoEvent;

	@Override
	public List<Class<? extends EventoPadrao<Vaga>>> eventosExecutarAntes() {
		return List.of(ValoresPadraoEvent.class);
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
	public Vaga novo(Vaga vaga) throws Exception {
		this.preOperacao(AcaoCrud.CREATE, vaga);
		em.persist(vaga);
		this.posOperacao(AcaoCrud.CREATE, vaga);
		return vaga;
	}

	@Transactional
	public Vaga alterar(Vaga vagaAtualizada) throws Exception {
		this.preOperacao(AcaoCrud.UPDATE, vagaAtualizada);

		// Carrega a entidade Vaga existente do banco de dados pelo ID
		Vaga vagaExistente = em.find(Vaga.class, vagaAtualizada.getId());

		// Verifica se a entidade Vaga existe
		if (vagaExistente == null) {
			throw new RuntimeException("Vaga não encontrada!");
		}

		vagaExistente.setNomeDaFuncao(vagaAtualizada.getNomeDaFuncao());
		vagaExistente.setQuantidadeDeVagas(vagaAtualizada.getQuantidadeDeVagas());
		vagaExistente.setGenero(vagaAtualizada.getGenero());
		vagaExistente.setFoto(vagaAtualizada.getFoto());
		vagaExistente.setUrlFoto(vagaAtualizada.getUrlFoto());
		vagaExistente.setDataLimiteSelecao(vagaAtualizada.getDataLimiteSelecao());
		vagaExistente.setDataLimiteIntegracao(vagaAtualizada.getDataLimiteIntegracao());
		vagaExistente.setSituacao(vagaAtualizada.getSituacao());
		vagaExistente.setAtribuicaoSumaria(vagaAtualizada.getAtribuicaoSumaria());
		vagaExistente.setAtividadesTipicas(vagaAtualizada.getAtividadesTipicas());
		vagaExistente.setAtividadesEventuais(vagaAtualizada.getAtividadesEventuais());
		vagaExistente.setNivelAutoridadeResponsabilidade(vagaAtualizada.getNivelAutoridadeResponsabilidade());
		vagaExistente.setHabilidadesNecessarias(vagaAtualizada.getHabilidadesNecessarias());
		vagaExistente.setRequisitosBasicos(vagaAtualizada.getRequisitosBasicos());
		vagaExistente.setRequisitosDesejaveis(vagaAtualizada.getRequisitosDesejaveis());
		vagaExistente.setEscolaridade(vagaAtualizada.getEscolaridade());
		vagaExistente.setCursosObrigatorios(vagaAtualizada.getCursosObrigatorios());
		vagaExistente.setTipoContrato(vagaAtualizada.getTipoContrato());
		vagaExistente.setCargaHorariaSemanal(vagaAtualizada.getCargaHorariaSemanal());
		vagaExistente.setRemuneracao(vagaAtualizada.getRemuneracao());
		vagaExistente.setInformaComissoesBonus(vagaAtualizada.isInformaComissoesBonus());
		vagaExistente.setComissoesBonus(vagaAtualizada.getComissoesBonus());
		vagaExistente.setValeAlimentacao(vagaAtualizada.isValeAlimentacao());
		vagaExistente.setValeTransporte(vagaAtualizada.isValeTransporte());
		vagaExistente.setValeRefeicao(vagaAtualizada.isValeRefeicao());
		vagaExistente.setSegundaFeiraInicio(vagaAtualizada.getSegundaFeiraInicio());
		vagaExistente.setSegundaFeiraFim(vagaAtualizada.getSegundaFeiraFim());
		vagaExistente.setTercaFeiraInicio(vagaAtualizada.getTercaFeiraInicio());
		vagaExistente.setTercaFeiraFim(vagaAtualizada.getTercaFeiraFim());
		vagaExistente.setQuartaFeiraInicio(vagaAtualizada.getQuartaFeiraInicio());
		vagaExistente.setQuartaFeiraFim(vagaAtualizada.getQuartaFeiraFim());
		vagaExistente.setQuintaFeiraInicio(vagaAtualizada.getQuintaFeiraInicio());
		vagaExistente.setQuintaFeiraFim(vagaAtualizada.getQuintaFeiraFim());
		vagaExistente.setSextaFeiraInicio(vagaAtualizada.getSextaFeiraInicio());
		vagaExistente.setSextaFeiraFim(vagaAtualizada.getSextaFeiraFim());
		vagaExistente.setSabadoInicio(vagaAtualizada.getSabadoInicio());
		vagaExistente.setSabadoFim(vagaAtualizada.getSabadoFim());
		vagaExistente.setDomingoInicio(vagaAtualizada.getDomingoInicio());
		vagaExistente.setDomingoFim(vagaAtualizada.getDomingoFim());

		// Mantém o valor atual de informacoesRock se estiver nulo na entidade vagaAtualizada
		if (vagaAtualizada.getInformacoesRock() != null) {
			vagaExistente.setInformacoesRock(vagaAtualizada.getInformacoesRock());
		}

		// Salva as alterações no banco de dados
		em.merge(vagaExistente);

		this.posOperacao(AcaoCrud.UPDATE, vagaAtualizada);
		return vagaAtualizada;
	}

	@Transactional
	public void deletar(Long id) throws Exception {
		Vaga vaga = Vaga.findById(id);
		preOperacao(AcaoCrud.DELETE, vaga);
		vaga.delete();
		posOperacao(AcaoCrud.DELETE, vaga);
	}

	@Override
	public Vaga buscarPorId(Long id) throws Exception {
		Vaga v = Vaga.findById(id);
		if (!logado.isAdminGeral()) {
			v.setInformacoesRock(null);

			if (!logado.getUsuario().getEmpresa().getId().equals(v.getEmpresa().getId()))
				return null;
		}
		return v;
	}

	public List<Vaga> buscarTodos() throws Exception {
		return Vaga.listAll();
	}
}