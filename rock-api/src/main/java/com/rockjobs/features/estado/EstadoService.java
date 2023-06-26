package com.rockjobs.features.estado;

import com.rockjobs.core.crud_base.ServiceBase;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
import org.hibernate.Session;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

@RequestScoped
public class EstadoService implements ServiceBase<Estado, Long> {
    @Inject
    EntityManager em;

    @Override
    public List<Class<? extends EventoPadrao<Estado>>> eventosExecutarAntes() {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends EventoPadrao<Estado>>> eventosExecutarDepois() {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends ValidacaoPadrao<Estado>>> validacoes() {
        return Collections.emptyList();
    }

    public Estado novo(Estado tipoEstabelecimento) throws Exception {
        throw new UnsupportedOperationException();
    }

    public Estado alterar(Estado tipoEstabelecimento) throws Exception {
        throw new UnsupportedOperationException();
    }

    public void deletar(Long id) throws Exception {
        throw new UnsupportedOperationException();
    }

    public Estado buscarPorId(Long id) {
        return Estado.findById(id);
    }
    
    public List<Estado> buscarTodos() {
        return Estado.listAll();
    }

    public List<Estado> buscarPorNome(String nome) throws ValidacaoException {
        try {
            return this.em.unwrap(Session.class).createSQLQuery(
                    " select * from estado ce " +
                            " where ce.nome ilike '%" + nome + "%' "
            ).addEntity(Estado.class).getResultList();
        } catch (Exception e ) {
            throw ValidacaoException.builder().status(400)
                    .mensagem("O registro não foi encontrado").build();
        }
    }
}