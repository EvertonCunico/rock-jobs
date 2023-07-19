package com.rockjobs.core.usuario.dto;

import com.rockjobs.core.usuario.TipoAcesso;
import com.rockjobs.core.usuario.Usuario;
import com.rockjobs.features.cliente.Cliente;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto  {

    public UsuarioDto(Usuario usuario) {
        this.setId(usuario.getId());
        this.setNome(usuario.getNome());
        this.setSobrenome(usuario.getSobrenome());
        this.setEmail(usuario.getEmail());
        this.setEndereco(usuario.getEndereco());
        this.setCpf(usuario.getCpf());
        this.setTelefoneCelular(usuario.getTelefoneCelular());
        this.setDataNascimento(usuario.getDataNascimento());
        this.setAtivo(usuario.getAtivo());
        this.setTipoAcesso(usuario.getTipoAcesso());
        this.setCliente(usuario.getCliente());
    }

    private Long id;

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 255, message = "Nome deve conter entre 3 a 255 caracteres")
    private String nome;

    @NotBlank(message = "Sobrenome é obrigatório")
    @Size(min = 3, max = 255, message = "Sobrenome deve conter entre 3 a 255 caracteres")
    private String sobrenome;

    @NotBlank(message = "E-mail é obrigatório")
    @Email(message = "E-mail inválido")
    private String email;

    private String senha;

    private String endereco;

    @NotNull(message = "CPF é obrigatório")
    private String cpf;

    private String telefoneCelular;

    private LocalDate dataNascimento;
    @NotNull(message = "Ativo é obrigatória")
    private Boolean ativo;
    private TipoAcesso tipoAcesso;

    private Cliente cliente;

    public Usuario mapToUsuario(UsuarioDto dto) {
        Usuario u = new Usuario();
        u.setNome(dto.getNome());
        u.setSobrenome(dto.getSobrenome());
        u.setEmail(dto.getEmail());
        u.setSenha(dto.getSenha());
        u.setCpf(dto.getCpf());
        u.setEndereco(dto.getEndereco());
        u.setTelefoneCelular(dto.getTelefoneCelular());
        u.setDataNascimento(dto.getDataNascimento());
        u.setAtivo(dto.getAtivo());
        u.setTipoAcesso(dto.getTipoAcesso());
        u.setCliente(dto.getCliente());
        return u;
    }
}