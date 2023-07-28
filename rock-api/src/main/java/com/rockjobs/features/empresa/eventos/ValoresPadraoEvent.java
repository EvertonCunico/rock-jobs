package com.rockjobs.features.empresa.eventos;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.util.Regex;
import com.rockjobs.core.util.StringUtil;
import com.rockjobs.features.empresa.Empresa;

import javax.enterprise.context.RequestScoped;
import java.util.Arrays;
import java.util.List;

@RequestScoped
public class ValoresPadraoEvent extends EventoPadrao<Empresa> {

    @Override
    public List<AcaoCrud> acoesExecutar() {
        return Arrays.asList(AcaoCrud.CREATE, AcaoCrud.UPDATE);
    }

    @Override
    public void executar(AcaoCrud acao, Empresa entity) {
        retiraMascara(entity);
    }

    public void retiraMascara(Empresa entity) {
        entity.setEmail(entity.getEmail().replaceAll(Regex.SEM_ESPACO, ""));
        if (StringUtil.isNotEmpty(entity.getTelefone()))
            entity.setTelefone(entity.getTelefone().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
        if (StringUtil.isNotEmpty(entity.getTelefoneResponsavelRH()))
            entity.setTelefoneResponsavelRH(entity.getTelefoneResponsavelRH().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
        if (StringUtil.isNotEmpty(entity.getCnpj()))
            entity.setCnpj(entity.getCnpj().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
        if (StringUtil.isNotEmpty(entity.getEnderecoCep()))
            entity.setEnderecoCep(entity.getEnderecoCep().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
    }
}
