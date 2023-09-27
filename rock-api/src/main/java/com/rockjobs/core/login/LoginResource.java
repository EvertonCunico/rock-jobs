package com.rockjobs.core.login;

import com.rockjobs.core.exceptions.ValidacaoException;
import com.rockjobs.core.login.model.LoginArgs;
import com.rockjobs.core.login.model.RecuperarSenha;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

@Path("login")
public class LoginResource {
    @Inject
    LoginService service;

    @POST
    public Response login(@Valid LoginArgs loginargs) throws Exception {
        return Response.ok().entity(service.autenticar(loginargs)).build();
    }

    @POST
    @Path("recuperar-senha")
    public Response recuperarSenha(@Valid RecuperarSenha recuperarSenha) throws ValidacaoException {
        service.recuperarSenha(recuperarSenha);
        return Response.ok().entity("").build();
    }
}