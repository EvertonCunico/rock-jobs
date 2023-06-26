package com.rockjobs.core.enums;

import lombok.Getter;

public enum SimNao {

    S("Sim"), N("Não");

    @Getter
    private final String descricao;

    SimNao(String descricao) {
        this.descricao = descricao;
    }
}
