package com.rockjobs.features.empresa.validacoes;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.util.StringUtil;
import com.rockjobs.features.empresa.Empresa;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

@RequestScoped
public class ValidaDuplicidade extends ValidacaoPadrao<Empresa> {

    @Inject
    EntityManager em;
    @Override
    public List<AcaoCrud> acoesValidar() {
        return List.of(AcaoCrud.CREATE, AcaoCrud.UPDATE);
    }

    @Override
    public void validar(AcaoCrud acao, Empresa entity) throws ValidacaoException {
        if (StringUtil.isNotEmpty(entity.getCnpj()) && Empresa.findByCNPJ(entity.getId(), entity.getCnpj()) != null)
            throw ValidacaoException.builder().status(400).mensagem("CNPJ já cadastrado na base de dados.").build();
    }
}
