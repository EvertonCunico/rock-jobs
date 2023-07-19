package com.rockjobs.features.cidade;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;
import com.rockjobs.core.pesquisa_base_old.RequestPesquisa;
import org.eclipse.microprofile.openapi.annotations.parameters.Parameter;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import java.util.List;

@Path("/cidade/pesquisa")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CidadePesquisaResource {
    @Inject
    CidadePesquisaService controller;

    @POST
    public PaginationResult<Cidade> pesquisa(RequestPesquisa requisicaoPesquisa) throws Exception {
        return controller.listar(requisicaoPesquisa);
    }
    
    @GET
    @Path("/cidades-usadas")
    public List<Cidade> listarCidadesUsadas() throws Exception {
        return controller.listarCidadesUsadas();
    }
    
    @GET
    @Path("/cidadesPorEstado")
    public List<Cidade> cidadesPorEstado(@QueryParam("estado") Integer estado) throws Exception {
        return controller.cidadesPorEstado(estado);
    }
    
    @GET
    @Path("/buscaCidadePorNome")
    public List<Cidade> cidadesPorEstado(@QueryParam("estado") String estado) throws Exception {
        return controller.cidadePorNome(estado);
    }
}