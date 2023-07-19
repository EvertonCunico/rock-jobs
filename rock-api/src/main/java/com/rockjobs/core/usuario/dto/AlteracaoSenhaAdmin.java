package com.rockjobs.core.usuario.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AlteracaoSenhaAdmin {
    private Long idUsuario;

    private String senha;
}