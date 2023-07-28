package com.rockjobs.features.empresa;

import com.rockjobs.core.pesquisa_base_old.RequestPesquisa;
import com.rockjobs.core.security.service.PermissoesAcesso;
import com.rockjobs.core.usuario.TipoAcesso;

import javax.inject.Inject;
import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/empresa")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class EmpresaResource {
    @Inject
    EmpresaService service;
    @Inject
    EmpresaPesquisaService pesquisaService;

    @GET
    @PermissoesAcesso(perfis = { TipoAcesso.ADMIN_GERAL })
    public List<Empresa> listarTodos() throws Exception {
        return service.buscarTodos();
    }

    @GET
    @Path("{id}")
    public Empresa buscarPorId(@PathParam("id") Long id) throws Exception {
        return service.buscarPorId(id);
    }

    @POST
    @PermissoesAcesso(perfis = { TipoAcesso.ADMIN_GERAL })
    public Response novo(@Valid Empresa dto) throws Exception {
        return Response.ok(service.novo(dto).getId()).build();
    }

    @PUT
    public Response alterar(@Valid Empresa dto) throws Exception {
        return Response.ok(service.alterar(dto)).build();
    }

    @DELETE
    @Path("{id}")
    @PermissoesAcesso(perfis = { TipoAcesso.ADMIN_GERAL })
    public Response deletar(@PathParam("id") Long id) throws Exception {
        service.deletar(id);
        return Response.status(204).build();
    }

    @POST
    @Path("/pesquisa")
    public Response pesquisa( RequestPesquisa requisicaoPesquisa )throws Exception {
        return Response.ok().entity(pesquisaService.listar(requisicaoPesquisa)).build();
    }
}
