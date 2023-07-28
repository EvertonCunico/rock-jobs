package com.rockjobs.features.vaga.eventos;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.features.vaga.Vaga;

import javax.enterprise.context.RequestScoped;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

@RequestScoped
public class ValoresPadraoEvent extends EventoPadrao<Vaga> {

    @Override
    public List<AcaoCrud> acoesExecutar() {
        return Arrays.asList(AcaoCrud.CREATE, AcaoCrud.UPDATE);
    }

    @Override
    public void executar(AcaoCrud acao, Vaga entity) {
        if (AcaoCrud.CREATE.equals(acao)) {
            entity.setDataInclusao(LocalDateTime.now());
            entity.setSequencialEmpresa(Vaga.findSeqByEmpresa(entity.getEmpresa().getId()));
        }
    }
}
