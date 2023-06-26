package com.rockjobs.features.cidade;

import com.rockjobs.Dados;
import com.rockjobs.core.crud_base.ServiceBase;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.util.StringUtil;
import org.hibernate.Session;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

@RequestScoped
public class CidadeService implements ServiceBase<Cidade, Long> {
    @Inject
    EntityManager em;
    @Inject
    Dados dados;

    @Override
    public List<Class<? extends EventoPadrao<Cidade>>> eventosExecutarAntes() {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends EventoPadrao<Cidade>>> eventosExecutarDepois() {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends ValidacaoPadrao<Cidade>>> validacoes() {
        return Collections.emptyList();
    }

    public Cidade novo(Cidade cidade) throws Exception {
        throw new UnsupportedOperationException();
    }

    public Cidade alterar(Cidade cidade) throws Exception {
        throw new UnsupportedOperationException();
    }

    public void deletar(Long id) throws Exception {
        throw new UnsupportedOperationException();
    }

    public Cidade buscarPorId(Long id) {
        return Cidade.findById(id);
    }
    
    public List<Cidade> buscarTodos() {
        return Cidade.listAll();
    }

    public List<Cidade> list(String query) {
        if (StringUtil.isEmpty(query)) return Cidade.listAll();
        return em.createQuery(
                "select c from Cidade c " +
                        "join c.estado e " +
                        "where upper(c.nome) like :query " +
                        "or upper(e.nome) like :query " +
                        "or upper(e.uf) like :query")
                        .setParameter("query", "%" + query.toUpperCase() + "%").getResultList();
    }

    public List<Cidade> buscarPorNome(String nome) throws ValidacaoException {
        try {
            return this.em.unwrap(Session.class).createSQLQuery(
                    " select * from cidade cc " +
                            " where cc.nome ilike '%" + nome + "%' "
            ).addEntity(Cidade.class).getResultList();
        } catch (Exception e ) {
            throw ValidacaoException.builder().status(400)
                    .mensagem("O registro não foi encontrado").build();
        }
    }
}