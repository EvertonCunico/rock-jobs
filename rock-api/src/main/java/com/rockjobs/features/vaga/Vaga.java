package com.rockjobs.features.vaga;

import com.rockjobs.features.empresa.Empresa;
import com.rockjobs.features.vaga.enums.Escolaridade;
import com.rockjobs.features.vaga.enums.Genero;
import com.rockjobs.features.vaga.enums.Situacao;
import com.rockjobs.features.vaga.enums.TipoContrato;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "vaga")
public class Vaga extends PanacheEntityBase implements Serializable, Cloneable {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "Empresa_id", referencedColumnName = "id")
    private Empresa empresa;

    @Column(name = "nome_da_funcao", length = 120)
    private String nomeDaFuncao;

    @Column
    private UUID foto;

    @Transient
    private String urlFoto;

    @Column(name = "quantidade_vagas")
    private Integer quantidadeDeVagas;

    @Column(name = "vaga_sigilosa")
    private Boolean vagaSigilosa;

    @Column(name = "data_limite_selecao")
    private LocalDate dataLimiteSelecao;

    @Column(name = "data_limite_integracao")
    private LocalDate dataLimiteIntegracao;

    @Column(name = "situacao")
    @Enumerated(EnumType.STRING)
    private Situacao situacao;

    @Column(name = "atribuicao_sumaria", length = 3000)
    private String atribuicaoSumaria;

    @Column(name = "atividades_tipicas", length = 3000)
    private String atividadesTipicas;

    @Column(name = "atividades_eventuais", length = 3000)
    private String atividadesEventuais;

    @Column(name = "nivel_autoridade_responsabilidade", length = 3000)
    private String nivelAutoridadeResponsabilidade;

    @Column(name = "habilidades_necessarias", length = 3000)
    private String habilidadesNecessarias;

    @Column(name = "requisitos_basicos", length = 3000)
    private String requisitosBasicos;

    @Column(name = "requisitos_desejaveis", length = 3000)
    private String requisitosDesejaveis;

    @Column
    @Enumerated(EnumType.STRING)
    private Escolaridade escolaridade;

    @Column(name = "cursos_obrigatorios", length = 3000)
    private String cursosObrigatorios;

    @Column(name="tipo_contrato")
    @Enumerated(EnumType.STRING)
    private TipoContrato tipoContrato;

    @Column(name = "carga_horaria_semanal")
    private Integer cargaHorariaSemanal;

    @Column(length = 3000)
    private String remuneracao;

    @Column(name = "informa_comissoes_bonus")
    private boolean informaComissoesBonus;

    @Column(name = "comissoes_bonus", length = 3000)
    private String comissoesBonus;

    @Column(name = "vale_alimentacao")
    private boolean valeAlimentacao;

    @Column(name = "vale_transporte")
    private boolean valeTransporte;

    @Column(name = "vale_refeicao")
    private boolean valeRefeicao;

    @Column(name = "segunda_feira_inicio")
    private LocalTime segundaFeiraInicio;

    @Column(name = "segunda_feira_fim")
    private LocalTime segundaFeiraFim;

    @Column(name = "terca_feira_inicio")
    private LocalTime tercaFeiraInicio;

    @Column(name = "terca_feira_fim")
    private LocalTime tercaFeiraFim;

    @Column(name = "quarta_feira_inicio")
    private LocalTime quartaFeiraInicio;

    @Column(name = "quarta_feira_fim")
    private LocalTime quartaFeiraFim;

    @Column(name = "quinta_feira_inicio")
    private LocalTime quintaFeiraInicio;

    @Column(name = "quinta_feira_fim")
    private LocalTime quintaFeiraFim;

    @Column(name = "sexta_feira_inicio")
    private LocalTime sextaFeiraInicio;

    @Column(name = "sexta_feira_fim")
    private LocalTime sextaFeiraFim;

    @Column(name = "sabado_inicio")
    private LocalTime sabadoInicio;

    @Column(name = "sabado_fim")
    private LocalTime sabadoFim;

    @Column(name = "domingo_inicio")
    private LocalTime domingoInicio;

    @Column(name = "domingo_fim")
    private LocalTime domingoFim;

    @Column(name = "informacao_rock")
    private String informacoesRock;

    @Column(name = "genero")
    @Enumerated(EnumType.STRING)
    private Genero genero;

    @Column(name = "data_inclusao")
    private LocalDateTime dataInclusao;

    @Column(name = "sequencial_por_empresa")
    private Long sequencialEmpresa;

    public String getNumeroSequencial() {
        if (this.id == null) return "";
        return dataInclusao.getYear() + this.empresa.getId() + this.sequencialEmpresa + "";
    }

    public static Vaga findByEmpresa(Long empresaId) {
        return find("Empresa.id = ?1", empresaId).firstResult();
    }

    public static Long findSeqByEmpresa(Long empresaId) {
        return find("empresa.id = ?1 ORDER BY sequencialEmpresa DESC", empresaId)
                .firstResultOptional()
                .map(vaga -> ((Vaga) vaga).getSequencialEmpresa() + 1L)
                .orElse(1L);
    }


}
