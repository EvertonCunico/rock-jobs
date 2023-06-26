package com.rockjobs.core.crud_base.validations;

import java.util.List;

public interface IValidacao<T> {

    List<AcaoCrud> acoesValidar();
    void validar(AcaoCrud acao, T entity) throws Exception;

}
