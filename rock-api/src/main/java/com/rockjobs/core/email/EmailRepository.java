package com.rockjobs.core.email;

import com.rockjobs.core.email.domain.Email;
import com.rockjobs.core.email.domain.EmailEstado;
import com.rockjobs.core.email.domain.EmailModelo;
import io.quarkus.hibernate.orm.panache.PanacheRepository;

import javax.enterprise.context.ApplicationScoped;
import java.util.List;

@ApplicationScoped
public class EmailRepository implements PanacheRepository<Email> {

    public List<Email> findTop10UnsentReceiptEmails(EmailModelo modelo, EmailEstado estado) {
        return this.find("modelo = ?1 AND estado = ?2", modelo, estado).page(0, 10).list();
    }

    public List<Email> findAllUnsentEmails() {
        return this.find("estado = ?1", "ENVIAR").list();
    }

    public void deletarPeloIdUsuario(Long idUsuario) {
        this.delete("usuario.id = ?1", idUsuario);
    }
}
