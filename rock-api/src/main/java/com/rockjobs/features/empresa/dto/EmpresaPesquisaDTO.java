package com.rockjobs.features.empresa.dto;

import com.rockjobs.core.queryMapper.CampoSQL;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmpresaPesquisaDTO {

    @CampoSQL
    private Long id;

    @CampoSQL(name = "razao_social")
    private String razaoSocial;

    @CampoSQL(name = "nome_fantasia")
    private String nomeFantasia;

    @CampoSQL
    private String email;

    @CampoSQL
    private String cnpj;

    @CampoSQL
    private String telefone;

    @CampoSQL
    private String endereco;

    @CampoSQL(name = "endereco_numero")
    private String enderecoNumero;

    @CampoSQL(name = "endereco_bairro")
    private String enderecoBairro;

    @CampoSQL(name = "endereco_cep")
    private String enderecoCEP;

    private String enderecoCompleto;

    public String getEnderecoCompleto() {
        if (enderecoCompleto == null) {
            StringBuilder enderecoFormatado = new StringBuilder();

            if (endereco != null) {
                enderecoFormatado.append(endereco);
            }

            if (enderecoNumero != null) {
                enderecoFormatado.append(", ").append(enderecoNumero);
            }

            if (enderecoBairro != null) {
                enderecoFormatado.append(", ").append(enderecoBairro);
            }

            if (enderecoCEP != null) {
                enderecoFormatado.append(", ").append(enderecoCEP);
            }
            enderecoCompleto = enderecoFormatado.toString();
        }
        return enderecoCompleto;
    }
}
