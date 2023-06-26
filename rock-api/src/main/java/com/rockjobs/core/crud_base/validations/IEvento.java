package com.rockjobs.core.crud_base.validations;

import java.util.List;

public interface IEvento<T> {

    List<AcaoCrud> acoesExecutar();
    void executar(AcaoCrud acao, T entity) throws Exception;

}
