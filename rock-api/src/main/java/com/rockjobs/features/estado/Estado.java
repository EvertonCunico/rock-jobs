package com.rockjobs.features.estado;

import com.rockjobs.features.pais.Pais;
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
@Table(name = "estado")
public class Estado extends PanacheEntityBase implements Serializable {
    @Id
    @Column(name = "estado_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull
    private String nome;

    @Column
    @NotNull
    private String uf;

    @ManyToOne
    @JoinColumn(name = "pais_id", referencedColumnName = "pais_id", nullable = false)
    private Pais pais;
}