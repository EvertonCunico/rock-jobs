package com.rockjobs.core.email.domain;

import com.rockjobs.core.usuario.Usuario;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "email")
public class Email {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_destinatario", nullable = false)
    private String nomeDestinatario;

    @Column(name = "endereco_email", nullable = false)
    private String enderecoEmail;

    @Column(name = "modelo", nullable = false)
    @Enumerated(EnumType.STRING)
    private EmailModelo modelo;

    @Column(name = "data", nullable = false)
    private LocalDateTime data;

    @Column(name = "estado", nullable = false)
    @Enumerated(EnumType.STRING)
    private EmailEstado estado;

    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;
}

