package com.rockjobs.core.usuario.validacoes;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.usuario.TipoAcesso;
import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.core.util.Regex;
import com.rockjobs.core.util.StringUtil;
import org.hibernate.Session;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@RequestScoped
public class ValoresObrigatorios extends ValidacaoPadrao<Usuario> {

    @Inject
    EntityManager em;
    @Override
    public List<AcaoCrud> acoesValidar() {
        return List.of(AcaoCrud.CREATE, AcaoCrud.UPDATE);
    }

    @Override
    public void validar(AcaoCrud acao, Usuario entity) throws ValidacaoException {
        if (!TipoAcesso.ADMIN_GERAL.equals(entity.getTipoAcesso()) && entity.getCliente() == null) {
            throw ValidacaoException.builder().mensagem("Cliente é obrigatório!").build();
        }
    }
}
