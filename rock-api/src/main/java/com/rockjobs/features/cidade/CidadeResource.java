package com.rockjobs.features.cidade;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/cidade")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CidadeResource {
    @Inject
    CidadeService controller;

    @GET
    @Path("{id}")
    public Cidade buscarPorId(@PathParam("id") Long id) throws Exception {
        return controller.buscarPorId(id);
    }

    @GET
    @Path("list")
    public List<Cidade> autocomplete(@QueryParam("query") String query) throws Exception {
        return controller.list(query);
    }

    @GET
    @Path("busca-nome")
    public List<Cidade> buscarTodos(@Parameter(name = "nome") @QueryParam("nome") String nome) throws Exception {
        return controller.buscarPorNome(nome);
    }
}