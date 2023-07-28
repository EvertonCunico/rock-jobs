package com.rockjobs.features.empresa;

import com.rockjobs.features.cidade.Cidade;
import com.rockjobs.features.empresa.enums.AreaDeAtuacao;
import com.rockjobs.features.empresa.enums.NumeroColaboradores;
import com.rockjobs.features.empresa.enums.RamoDeAtuacao;
import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "empresa")
public class Empresa extends PanacheEntityBase implements Serializable {

    @Id
    @Column
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_fantasia", nullable = false)
    private String nomeFantasia;

    @Column(name = "razao_social", nullable = false)
    private String razaoSocial;

    @Column(nullable = false, length = 14)
    private String cnpj;

    @Column
    private UUID foto;

    @Transient
    private String urlFoto;

    @Column(name = "inscricao_estadual", length = 20)
    private String inscricaoEstadual;

    @Column(length = 20)
    private String telefone;

    @Column(length = 100, nullable = false)
    private String email;

    @Column
    private String endereco;

    @Column(name = "endereco_numero", length = 20)
    private String enderecoNumero;

    @Column(name = "endereco_bairro", length = 100)
    private String enderecoBairro;

    @Column(name = "endereco_cep", length = 8)
    private String enderecoCep;

    @ManyToOne
    @JoinColumn(name = "cidade_id", referencedColumnName = "cidade_id")
    private Cidade cidade;

    @Enumerated(EnumType.STRING)
    @Column(name = "numero_colaboradores")
    private NumeroColaboradores numeroDeColaboradores;

    @Enumerated(EnumType.STRING)
    @Column(name = "area_atuacao")
    private AreaDeAtuacao areaDeAtuacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "ramo_atuacao")
    private RamoDeAtuacao ramoDeAtuacao;

    @Column(name = "responsavel_rh")
    private String responsavelRH;

    @Column(name = "telefone_responsavel_rh", length = 20)
    private String telefoneResponsavelRH;

    @Column(name = "responsavel_empresa")
    private String responsavelEmpresa;

    @Column(name = "telefone_responsavel_empresa", length = 20)
    private String telefoneResponsavelEmpresa;

    public static Empresa findByCNPJ(Long id, String value) {
        if (id != null) {
            return find("id <> ?1 and cnpj = ?2", id, value).firstResult();
        }
        return find("cnpj = ?1", value).firstResult();
    }

}
