package com.rockjobs.features.cliente.validacoes;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.core.util.Regex;
import com.rockjobs.core.util.StringUtil;
import com.rockjobs.features.cliente.Cliente;
import org.hibernate.Session;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@RequestScoped
public class ValidaDuplicidadeCliente extends ValidacaoPadrao<Cliente> {

    @Inject
    EntityManager em;
    @Override
    public List<AcaoCrud> acoesValidar() {
        return List.of(AcaoCrud.CREATE, AcaoCrud.UPDATE);
    }

    @Override
    public void validar(AcaoCrud acao, Cliente entity) throws ValidacaoException {
        if (StringUtil.isNotEmpty(entity.getCnpj()) && Cliente.findByCNPJ(entity.getId(), entity.getCnpj()) != null)
            throw ValidacaoException.builder().status(400).mensagem("CNPJ já cadastrado na base de dados.").build();
    }
}
