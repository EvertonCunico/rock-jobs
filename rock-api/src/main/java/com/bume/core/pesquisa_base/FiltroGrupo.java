package com.bume.core.pesquisa_base;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FiltroGrupo {
    private List<FiltroCampo> campos;
    private String operador;
}
