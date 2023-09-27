package com.rockjobs.core.email;

import com.rockjobs.core.email.domain.Email;
import com.rockjobs.core.usuario.Usuario;

import java.util.Set;

public interface IEmailController {

    void enviar(String recipient, String subject, String content);

    void novo(Email email);

    void alterar (Email email);

    void recuperarSenha(Usuario usuario, String senha);

}
