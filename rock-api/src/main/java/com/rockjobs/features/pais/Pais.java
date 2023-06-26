package com.rockjobs.features.pais;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;
import io.smallrye.common.constraint.NotNull;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "pais")
public class Pais extends PanacheEntityBase implements Serializable {
    @Id
    @Column(name = "pais_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull
    private String nome;

    @Column
    @NotNull
    private String nome_pt;

    @Column
    @NotNull
    private String sigla;

    @Column
    @NotNull
    private Integer bacen;
}