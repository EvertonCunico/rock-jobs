package com.rockjobs.core.usuario.eventos;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.core.util.Regex;
import com.rockjobs.core.util.StringUtil;

import javax.enterprise.context.RequestScoped;
import java.util.Arrays;
import java.util.List;

@RequestScoped
public class ValoresPadraoEvent extends EventoPadrao<Usuario> {

    @Override
    public List<AcaoCrud> acoesExecutar() {
        return Arrays.asList(AcaoCrud.CREATE, AcaoCrud.UPDATE);
    }

    @Override
    public void executar(AcaoCrud acao, Usuario entity) {
        retiraMascara(entity);
    }

    public void retiraMascara(Usuario entity) {
        entity.setEmail(entity.getEmail().replaceAll(Regex.SEM_ESPACO, ""));
        if (StringUtil.isNotEmpty(entity.getTelefoneCelular()))
            entity.setTelefoneCelular(entity.getTelefoneCelular().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
        if (StringUtil.isNotEmpty(entity.getCpf()))
            entity.setCpf(entity.getCpf().replaceAll(Regex.DIGITO_SEM_MASCARA, ""));
    }
}
