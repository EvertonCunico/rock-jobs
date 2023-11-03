package com.rockjobs.features.vaga;import com.ordnaelmedeiros.jpafluidselect.querybuilder.select.pagination.PaginationResult;import com.rockjobs.Dados;import com.rockjobs.core.pesquisa_base_old.RequestPesquisa;import com.rockjobs.core.security.service.Logado;import com.rockjobs.core.usuario.TipoAcesso;import com.rockjobs.core.util.StringUtil;import org.hibernate.Session;import javax.enterprise.context.RequestScoped;import javax.inject.Inject;import javax.persistence.EntityManager;import javax.persistence.Query;import java.text.ParseException;import java.time.LocalDateTime;import java.time.format.DateTimeFormatter;import java.util.HashMap;import java.util.List;@RequestScopedpublic class VagaPesquisaService {    @Inject    EntityManager em;    @Inject    Logado logado;    private static final String SQL =            "select " +            "<<campos>>" +            " from " +            "vaga t " +            "<<joins>> " +            "where (true) ";    private static final String CAMPOS_PESQUISA =            "t.id, " +            "t.Empresa_id, " +            "c.Empresa_razao_social, " +            "t.nome_da_funcao, " +            "t.quantidade_vagas, " +            "t.vaga_sigilosa, " +            "t.data_limite_selecao, " +            "t.data_limite_integracao, " +            "t.atribuicao_sumaria, " +            "t.atividades_tipicas, " +            "t.atividades_eventuais, " +            "t.nivel_autoridade_responsabilidade ";    private static final String JOINS = " inner join Empresa c on (c.id = t.Empresa_id) ";    public PaginationResult<Vaga> listar(RequestPesquisa requestPesquisa) throws Exception {        //Faz o count dos registros        var sql = SQL;        sql = adicionaFiltrosPesquisa(requestPesquisa, sql);        sql = sql.replace("<<campos>>", "count(*) ");        sql = sql.replace("<<joins>>", JOINS);        Long count = Long.valueOf(this.em.unwrap(Session.class).createSQLQuery(sql).getSingleResult().toString());        //Busca registros        sql = SQL;        sql = sql.replace("<<campos>>", " t.* ");        sql = sql.replace("<<joins>>", JOINS);        sql = adicionaFiltrosPesquisa(requestPesquisa, sql);        sql = sql + " order by id ";        if (requestPesquisa.getPagina() > -1) {            sql = sql + "limit 50 " + (requestPesquisa.getPagina() > 1 ? "offset " + (requestPesquisa.getPagina() - 1) * 50 : "");        }        //Query q = this.em.createNativeQuery(sql);        //List<VagaPesquisaDTO> result = QueryMapper.getListDTO(q, VagaPesquisaDTO.class);        Query query = this.em.unwrap(Session.class).createSQLQuery(sql).addEntity(Vaga.class);        List<Vaga> result = query.getResultList();        if (logado.isAdminGeral()) {            result.forEach(i -> i.setInformacoesRock(null));        }        return Dados.geraLista(result, requestPesquisa.getPagina(), count);    }    private String adicionaFiltrosPesquisa(RequestPesquisa requestPesquisa, String sql) throws ParseException {        if (!TipoAcesso.ADMIN_GERAL.equals(logado.getUsuario().getTipoAcesso())) {            sql += " and (t.Empresa_id = " + logado.getUsuario().getEmpresa().getId() + ") ";        }        if (StringUtil.isNotEmpty(requestPesquisa.getValor())) {            sql = sql + " and (t.nome_da_funcao ilike '%" + requestPesquisa.getValor() + "%' or c.nome_fantasia ilike '%" + requestPesquisa.getValor() + "%')";        }        if (requestPesquisa.getFiltrosPersonalizados() != null && !requestPesquisa.getFiltrosPersonalizados().isEmpty()) {            if (requestPesquisa.getFiltrosPersonalizados().containsKey("Empresa")) {                try {                    HashMap<String, Object> cliObject = (HashMap<String, Object>)requestPesquisa.getFiltrosPersonalizados().get("Empresa");                    if (cliObject.containsKey("id")) {                        sql = sql + " and t.Empresa_id = " + cliObject.get("id");                    }                }  catch (Exception ignored) {};            }            if (requestPesquisa.getFiltrosPersonalizados().containsKey("dataSelecao") && StringUtil.isNotEmpty(requestPesquisa.getFiltrosPersonalizados().get("dataSelecao"))) {                LocalDateTime date = LocalDateTime.parse(requestPesquisa.getFiltrosPersonalizados().get("dataSelecao").toString(), DateTimeFormatter.ISO_DATE_TIME);                sql = sql + " and t.data_limite_selecao <= '" + date.format(DateTimeFormatter.ISO_DATE) + "'";            }            if (requestPesquisa.getFiltrosPersonalizados().containsKey("funcao") && StringUtil.isNotEmpty(requestPesquisa.getFiltrosPersonalizados().get("funcao"))) {                sql = sql + " and t.nome_da_funcao ilike '%" + requestPesquisa.getFiltrosPersonalizados().get("funcao") + "%'";            }            if (requestPesquisa.getFiltrosPersonalizados().containsKey("vagas") && StringUtil.isNotEmpty(requestPesquisa.getFiltrosPersonalizados().get("vagas"))) {                sql = sql + " and t.quantidade_vagas = " + requestPesquisa.getFiltrosPersonalizados().get("vagas");            }            if (requestPesquisa.getFiltrosPersonalizados().containsKey("situacao") && StringUtil.isNotEmpty(requestPesquisa.getFiltrosPersonalizados().get("situacao"))) {                sql = sql + " and t.situacao = '" + requestPesquisa.getFiltrosPersonalizados().get("situacao") + "'";            }        }        return sql;    }}