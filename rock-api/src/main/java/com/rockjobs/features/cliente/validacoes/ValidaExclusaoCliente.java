package com.rockjobs.features.cliente.validacoes;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.core.util.StringUtil;
import com.rockjobs.features.cliente.Cliente;
import com.rockjobs.features.vaga.Vaga;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

@RequestScoped
public class ValidaExclusaoCliente extends ValidacaoPadrao<Cliente> {

    @Inject
    EntityManager em;
    @Override
    public List<AcaoCrud> acoesValidar() {
        return List.of(AcaoCrud.DELETE);
    }

    @Override
    public void validar(AcaoCrud acao, Cliente entity) throws ValidacaoException {
        if (Usuario.findByCliente(entity.getId()) != null)
            throw ValidacaoException.builder().status(400).mensagem("Existe Usuário vinculado a este cliente!").build();
        if (Vaga.findByCliente(entity.getId()) != null)
            throw ValidacaoException.builder().status(400).mensagem("Existe Vaga vinculada a este cliente!").build();
    }
}
