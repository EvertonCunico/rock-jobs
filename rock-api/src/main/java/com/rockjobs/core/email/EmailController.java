package com.rockjobs.core.email;

import java.text.NumberFormat;
import java.time.LocalDateTime;

import com.rockjobs.core.email.domain.Email;
import com.rockjobs.core.email.domain.EmailEstado;
import com.rockjobs.core.email.domain.EmailModelo;
import com.rockjobs.core.usuario.Usuario;
import lombok.SneakyThrows;

import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.util.*;

import static com.rockjobs.core.Properties.getProperty;

@RequestScoped
public class EmailController implements IEmailController {
    @Inject
    EmailRepository emailRepository;

    private static final String FROM = "contato@rockjobs.com.br";
    private static final String FROMNAME = "RockJobs";

    private final String username = getProperty("mail.username");
    private final String password = getProperty("mail.password");

    private static final String HOST = getProperty("mail.smtp.host");
    private static final String PORT = getProperty("mail.smtp.port");

    @SneakyThrows
    @Override
    public void enviar(String recipient, String subject, String content) {
        var props = new Properties();
        props.put("mail.smtp.host", HOST);
        props.put("mail.smtp.port", PORT);
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");


        var session = Session.getInstance(props,
                new Authenticator() {
                    @Override
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(username, password);
                    }
                }
        );

        var message = new MimeMessage(session);
        message.setFrom(new InternetAddress(FROM, FROMNAME));
        message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipient));
        message.setSubject(subject);
        message.setContent(content, "text/html; charset=utf-8");
        Transport.send(message);
    }

    @Override
    @Transactional
    public void novo(Email email) {
        emailRepository.persist(email);
    }

    @Override
    @Transactional
    public void alterar(Email email) {
        emailRepository.persist(email);
    }

    @Override
    @Transactional
    public void recuperarSenha(Usuario usuario, String senha) {
        try {
            var engine = createTemplateEngine();

            var context = new Context();
            context.setVariable("novaSenha", senha);

            var html = engine.process("recuperar-senha", context);
            enviar(usuario.getEmail(), "Recuperar Senha", html);
            emailRepository.persist(new Email().builder().estado(EmailEstado.ENVIADO)
                    .enderecoEmail(usuario.getEmail())
                    .data(LocalDateTime.now())
                    .nomeDestinatario(usuario.getNome())
                    .modelo(EmailModelo.RECUPERAR_SENHA)
                    .usuario(new Usuario().builder().id(usuario.getId()).build())
                    .build());
        } catch (Exception e) {
            emailRepository.persist(new Email().builder().estado(EmailEstado.ERRO)
                    .enderecoEmail(usuario.getEmail())
                    .data(LocalDateTime.now())
                    .nomeDestinatario(usuario.getNome())
                    .modelo(EmailModelo.RECUPERAR_SENHA)
                    .usuario(new Usuario().builder().id(usuario.getId()).build())
                    .build());
        }
    }

    private TemplateEngine createTemplateEngine() {
        var resolver = new ClassLoaderTemplateResolver();
        resolver.setPrefix("/templates/");
        resolver.setSuffix(".html");
        resolver.setCharacterEncoding("UTF-8");
        var engine = new TemplateEngine();
        engine.setTemplateResolver(resolver);
        return engine;
    }
}
