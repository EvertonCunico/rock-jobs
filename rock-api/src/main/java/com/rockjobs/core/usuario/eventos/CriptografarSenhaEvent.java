package com.rockjobs.core.usuario.eventos;

import com.rockjobs.core.crud_base.validations.AcaoCrud;
import com.rockjobs.core.crud_base.validations.EventoPadrao;
import com.rockjobs.core.security.PasswordUtil;
import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.core.util.StringUtil;

import javax.enterprise.context.RequestScoped;
import java.util.Arrays;
import java.util.List;

@RequestScoped
public class CriptografarSenhaEvent extends EventoPadrao<Usuario> {

    @Override
    public List<AcaoCrud> acoesExecutar() {
        return Arrays.asList(AcaoCrud.CREATE);
    }

    @Override
    public void executar(AcaoCrud acao, Usuario entity) {
        if (StringUtil.isNotEmpty(entity.getSenha())) {
            entity.setSenha(PasswordUtil.encryptPassword(entity.getSenha()));
        }
    }
}
