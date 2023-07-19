package com.rockjobs.features.cidade;

import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;
import com.rockjobs.Dados;
import com.rockjobs.core.pesquisa_base_old.RequestPesquisa;
import com.rockjobs.core.util.StringUtil;
import org.hibernate.Session;

import javax.enterprise.context.RequestScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

@RequestScoped
public class CidadePesquisaService {
    @Inject
    EntityManager em;
    @Inject
    Dados dados;

    private final static String SQL =
            "select\n" +
            "<<campos>>" +
            "from\n" +
            "cidade t\n" +
            "<<joins>>\n" +
            "where (true) ";
    private final static String CAMPOS_PESQUISA =
            "t.cidade_id,\n" +
            "t.nome,\n" +
            "e.uf \n";
    private final static String JOINS =
            "inner join estado e on (t.estado_id=e.estado_id) \n";

    public PaginationResult<Cidade> listar(RequestPesquisa requisicaoPesquisa) throws Exception {
        List<Cidade> lista = null;
        //Faz o count dos registros
        String sql = SQL;
        sql = adicionaFiltrosPesquisa(requisicaoPesquisa, sql);
        sql = sql.replace("<<campos>>", "count(*) ");
        sql = sql.replace("<<joins>>", JOINS);
        Long count = Long.valueOf(this.em.unwrap(Session.class).createSQLQuery(sql).getSingleResult().toString());
        //Busca registros
        sql = SQL;
        sql = sql.replace("<<campos>>", "*");
        sql = sql.replace("<<joins>>", JOINS);
        sql = adicionaFiltrosPesquisa(requisicaoPesquisa, sql);
        sql = sql + " order by t.nome limit 50 " + (requisicaoPesquisa.getPagina() > 1 ? "offset " + (requisicaoPesquisa.getPagina() - 1) * 50 : "");
        List<Cidade> cidades = this.em.unwrap(Session.class).createSQLQuery(sql).addEntity(Cidade.class).getResultList();
        PaginationResult<Cidade> list = Dados.geraLista(cidades, requisicaoPesquisa.getPagina(), count);
        return list;
    }

    private String adicionaFiltrosPesquisa(RequestPesquisa requestPesquisa, String sql) {
        if (requestPesquisa.getValor() != null) {
            if (StringUtil.isNumeric(requestPesquisa.getValor())) {
                sql = sql + " and (t.cidade_id = " + requestPesquisa.getValor() + ")";
            } else {
                sql = sql + " and (t.nome ilike '%" + requestPesquisa.getValor() + "%') ";
            }
        }
        return sql;
    }
    
    public List<Cidade> listarCidadesUsadas() throws Exception {
        List<Cidade> lista = null;
        String sql = SQL;
        sql = sql.replace("<<campos>>", "*");
        sql = sql.replace("<<joins>>", JOINS);
        sql = sql + " and exists(select 1 from cliente c where c.cidade_id=t.cidade_id) order by t.nome";
        return this.em.unwrap(Session.class).createSQLQuery(sql).addEntity(Cidade.class).getResultList();
    }
    
    public List<Cidade> cidadesPorEstado(Integer estado) throws Exception {
        List<Cidade> lista = null;
        String sql = SQL;
        sql = sql.replace("<<campos>>", "*");
        sql = sql.replace("<<joins>>", JOINS);
        sql = sql + " and t.estado_id="+estado+" order by t.nome";
        return this.em.unwrap(Session.class).createSQLQuery(sql).addEntity(Cidade.class).getResultList();
    }
    
    public List<Cidade> cidadePorNome(String nome) throws Exception {
        List<Cidade> lista = null;
        String sql = SQL;
        sql = sql.replace("<<campos>>", "*");
        sql = sql.replace("<<joins>>", JOINS);
        sql = sql + " and t.nome ilike '%" + nome + "%' order by t.nome";
        return this.em.unwrap(Session.class).createSQLQuery(sql).addEntity(Cidade.class).getResultList();
    }
}