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
        if (StringUtil.isNotEmpty(entity.getCpf()) && existsByCPF(entity.getCpf()))
            throw ValidacaoException.builder().status(400).mensagem("CPF já cadastrado na base de dados.").build();
        if (StringUtil.isNotEmpty(entity.getEmail()) && existsByEmail(entity.getEmail()))
            throw ValidacaoException.builder().status(400).mensagem("E-mail já cadastrado na base de dados.").build();
    }

    private boolean existsByCPF(String cpf) {
        return (boolean) em.unwrap(Session.class)
                .createSQLQuery("SELECT EXISTS(SELECT 1 FROM usuario u WHERE u.cpf = :cpf)")
                .setParameter("cpf", cpf.replaceAll(Regex.DIGITO_SEM_MASCARA, ""))
                .getSingleResult();
    }

    private boolean existsByEmail(String email) {
        return (boolean) em.unwrap(Session.class)
                .createSQLQuery("SELECT EXISTS(SELECT 1 FROM usuario u WHERE u.email = :email)")
                .setParameter("email", email)
                .getSingleResult();
    }
}
