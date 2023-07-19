package com.rockjobs.features.vaga;

import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.features.cidade.Cidade;
import com.rockjobs.features.cliente.Cliente;
import com.rockjobs.features.cliente.enums.AreaDeAtuacao;
import com.rockjobs.features.cliente.enums.NumeroClientes;
import com.rockjobs.features.cliente.enums.RamoDeAtuacao;
import com.rockjobs.features.vaga.enums.Escolaridade;
import com.rockjobs.features.vaga.enums.Situacao;
import com.rockjobs.features.vaga.enums.TipoContrato;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDate;
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
    @JoinColumn(name = "cliente_id", referencedColumnName = "id")
    private Cliente cliente;

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

    public static Vaga findByCliente(Long clienteId) {
        return find("cliente.id = ?1", clienteId).firstResult();
    }

}
