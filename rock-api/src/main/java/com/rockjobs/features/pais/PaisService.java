package com.rockjobs.features.pais;

import com.rockjobs.core.crud_base.ServiceBase;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

@RequestScoped
public class PaisService implements ServiceBase<Pais, Long> {
    @Inject
    EntityManager em;

    @Override
    public List<Class<? extends EventoPadrao<Pais>>> eventosExecutarAntes() {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends EventoPadrao<Pais>>> eventosExecutarDepois() {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends ValidacaoPadrao<Pais>>> validacoes() {
        return Collections.emptyList();
    }

    public Pais novo(Pais tipoEstabelecimento) throws Exception {
        throw new UnsupportedOperationException();
    }

    public Pais alterar(Pais tipoEstabelecimento) throws Exception {
        throw new UnsupportedOperationException();
    }

    public void deletar(Long id) throws Exception {
        throw new UnsupportedOperationException();
    }

    public Pais buscarPorId(Long id) {
        return Pais.findById(id);
    }

    public List<Pais> buscarTodos() {
        return Pais.listAll();
    }
}