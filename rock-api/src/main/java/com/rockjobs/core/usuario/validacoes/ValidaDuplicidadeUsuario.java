package com.rockjobs.core.usuario.validacoes;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.ValidacaoPadrao;
import com.rockjobs.core.exceptions.ValidacaoException;
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
public class ValidaDuplicidadeUsuario extends ValidacaoPadrao<Usuario> {

    @Inject
    EntityManager em;
    @Override
    public List<AcaoCrud> acoesValidar() {
        return List.of(AcaoCrud.CREATE, AcaoCrud.UPDATE);
    }

    @Override
    public void validar(AcaoCrud acao, Usuario entity) throws ValidacaoException {
        if (StringUtil.isNotEmpty(entity.getCpf()) && existsByCPF(acao, entity))
             throw ValidacaoException.builder().status(400).mensagem("CPF já cadastrado na base de dados.").build();
        if (StringUtil.isNotEmpty(entity.getEmail()) && existsByEmail(acao, entity))
            throw ValidacaoException.builder().status(400).mensagem("E-mail já cadastrado na base de dados.").build();
    }

    private boolean existsByCPF(AcaoCrud acao, Usuario entity) {
        Query q = em.unwrap(Session.class)
                .createSQLQuery("SELECT EXISTS(SELECT 1 FROM usuario u WHERE u.cpf = :cpf " + (AcaoCrud.UPDATE.equals(acao) ? " and u.id <> :id" : "") + ")");
        q.setParameter("cpf", entity.getCpf().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
        if (AcaoCrud.UPDATE.equals(acao)) {
            q.setParameter("id", entity.getId());
        }
        return (boolean) q.getSingleResult();
    }

    private boolean existsByEmail(AcaoCrud acao, Usuario entity) {
        Query q = em.unwrap(Session.class)
                .createSQLQuery("SELECT EXISTS(SELECT 1 FROM usuario u WHERE u.email = :email " + (AcaoCrud.UPDATE.equals(acao) ? " and u.id <> :id" : "") + ")");
        q.setParameter("email", entity.getEmail().replaceAll(Regex.SEM_ESPACO, ""));
        if (AcaoCrud.UPDATE.equals(acao)) {
            q.setParameter("id", entity.getId());
        }
        return (boolean) q.getSingleResult();
    }
}
