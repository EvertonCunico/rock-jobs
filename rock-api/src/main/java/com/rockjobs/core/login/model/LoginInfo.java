package com.rockjobs.core.login.model;

import com.rockjobs.core.usuario.dto.UsuarioDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginInfo {
    private UsuarioDto usuario;
    private String token;

}