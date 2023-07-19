package com.rockjobs.features.vaga.dto;

import com.rockjobs.core.queryMapper.CampoSQL;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Column;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class VagaPesquisaDTO {
    @CampoSQL
    private Long id;

    @CampoSQL(name = "cliente_id")
    private Long clienteId;

    @CampoSQL(name = "cliente_razao_social")
    private String clienteRazaoSocial;

    @CampoSQL(name = "nome_da_funcao")
    private String nomeDaFuncao;

    @CampoSQL(name = "quantidade_vagas")
    private Integer quantidadeVagas;

    @CampoSQL(name = "vaga_sigilosa")
    private Boolean vagaSigilosa;

    @CampoSQL(name = "data_limite_selecao")
    private LocalDate dataLimiteSelecao;

    @CampoSQL(name = "data_limite_integracao")
    private LocalDate dataLimiteIntegracao;

    @CampoSQL(name = "atribuicao_sumaria")
    private String atribuicaoSumaria;

    @CampoSQL(name = "atividades_tipicas")
    private String atividadesTipicas;

    @CampoSQL(name = "atividades_eventuais")
    private String atividadesEventuais;

    @CampoSQL(name = "nivel_autoridade_responsabilidade")
    private String nivelAutoridadeResponsabilidade;
}
