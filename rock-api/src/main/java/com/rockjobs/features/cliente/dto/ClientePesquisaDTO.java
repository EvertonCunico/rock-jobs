package com.rockjobs.features.cliente.dto;

import com.rockjobs.core.queryMapper.CampoSQL;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ClientePesquisaDTO {

    @CampoSQL
    private Long id;

    @CampoSQL(name = "razao_social")
    private String razaoSocial;

    @CampoSQL
    private String email;

    @CampoSQL
    private String cnpj;

    @CampoSQL
    private String telefone;
}
