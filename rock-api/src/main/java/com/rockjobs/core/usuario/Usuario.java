package com.rockjobs.core.usuario;import com.rockjobs.features.cliente.Cliente;import io.quarkus.hibernate.orm.panache.PanacheEntityBase;import lombok.*;import javax.persistence.*;import java.io.Serializable;import java.time.LocalDate;import java.util.UUID;@Getter@Setter@AllArgsConstructor@NoArgsConstructor@Builder@Entity@Table(name = "usuario")public class Usuario extends PanacheEntityBase implements Serializable, Cloneable {    @Id    @Column    @GeneratedValue(strategy = GenerationType.IDENTITY)    private Long id;    @Column(nullable = false)    private String nome;    @Column(nullable = false)    private String sobrenome;    @Column(length = 14, unique = true)    private String cpf;    @Column(name = "data_nascimento", length = 20)    private LocalDate dataNascimento;    @Column(name = "telefone_celular", length = 20)    private String telefoneCelular;    @Column    private String endereco;    @Column(length = 100, nullable = false, unique = true)    private String email;    @Column(length = 100, nullable = false, unique = true)    private String senha;    @Column    private UUID foto;    @Transient    private String urlFoto;    @Column(nullable = false)    private Boolean ativo;    @Column(name = "tipo_acesso", nullable = false)    @Enumerated(EnumType.STRING)    private TipoAcesso tipoAcesso;    @ManyToOne    @JoinColumn(name = "cliente_id", referencedColumnName = "id")    private Cliente cliente;    public static Usuario findByEmailAndAtivo(String value) {        return find("email = ?1 and ativo = true", value).firstResult();    }    public static Usuario findByCliente(Long clienteId) {        return find("cliente.id = ?1", clienteId).firstResult();    }    @Override    protected Object clone() throws CloneNotSupportedException {        return super.clone();    }}