package com.rockjobs.features.cidade;

import com.rockjobs.features.estado.Estado;
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
@Table(name = "cidade")
public class Cidade extends PanacheEntityBase implements Serializable {
    @Id
    @Column(name = "cidade_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @NotNull
    private String nome;

    @ManyToOne
    @JoinColumn(name = "estado_id", referencedColumnName = "estado_id", nullable = false)
    private Estado estado;
}