package com.rockjobs.features.empresa.validacoes;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.features.empresa.Empresa;
import com.rockjobs.features.vaga.Vaga;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

@RequestScoped
public class ValidaExclusao extends ValidacaoPadrao<Empresa> {

    @Inject
    EntityManager em;
    @Override
    public List<AcaoCrud> acoesValidar() {
        return List.of(AcaoCrud.DELETE);
    }

    @Override
    public void validar(AcaoCrud acao, Empresa entity) throws ValidacaoException {
        if (Usuario.findByEmpresa(entity.getId()) != null)
            throw ValidacaoException.builder().status(400).mensagem("Existe Usuário vinculado a esta Empresa!").build();
        if (Vaga.findByEmpresa(entity.getId()) != null)
            throw ValidacaoException.builder().status(400).mensagem("Existe Vaga vinculada a esta Empresa!").build();
    }
}
