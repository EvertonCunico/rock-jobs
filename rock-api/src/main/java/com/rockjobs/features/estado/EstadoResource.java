package com.rockjobs.features.estado;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/estado")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EstadoResource {
    @Inject
    EstadoService controller;

    @GET
    @Path("buscarTodos")
    public List<Estado> buscarTodos() throws Exception {
        return controller.buscarTodos();
    }

    @GET
    @Path("buscaEstadoPorNome")
    public List<Estado> buscarTodos(@Parameter(name = "nome") @QueryParam("nome") String nome) throws Exception {
        return controller.buscarPorNome(nome);
    }
}