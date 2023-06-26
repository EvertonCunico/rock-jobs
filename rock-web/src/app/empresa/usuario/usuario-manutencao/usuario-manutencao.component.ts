import { Component, Injector, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { ManutencaoViewBase } from "@boom/ui/views/manutencao-view-base";

import { Usuario } from "app/modelos/usuario";
import { UsuarioCRUDService } from "app/services/usuario-crud.service";

import { cpf } from "cpf-cnpj-validator";
import { MessageService } from "primeng/api";
import { AlteracaoSenhaAdmin } from "../../../modelos/alteracao_senha_admin";
import { EnumUtils } from "app/shared/utils/enum-utils";
import { SimNaoBoolean } from "@boom/modelos/sim-nao";
import { RolesUser } from "app/modelos/roles";

export function verificarCPFValido(
  control: AbstractControl
): { [key: string]: any } | null {
  if (control.value == null) {
    return null;
  }
  const cpfSemMascara = control.value.replace(/\D/g, "");
  const cpfValido = cpf.isValid(cpfSemMascara);
  if (!cpfValido) {
    return { invalidCPF: { value: control.value } };
  }
  return null;
}

@Component({
  selector: "app-usuario-manutencao",
  templateUrl: "./usuario-manutencao.component.html",
  styleUrls: ["./usuario-manutencao.component.css"],
  providers: [],
})
export class UsuarioManutencaoComponent
  extends ManutencaoViewBase<Usuario>
  implements OnInit
{
  idUsuario: any = null;

  situacoes = [];

  permissoes = [];

  formAlterarSenha: FormGroup;

  constructor(
    protected injector: Injector,
    public userCRUDService: UsuarioCRUDService,
    private messageService: MessageService
  ) {
    super(injector, userCRUDService);
    this.titulo = "Cadastros / Usuário";
    this.form = this.formBuilder.group({
      nome: ["", [Validators.required, Validators.maxLength(255)]],
      sobrenome: ["", [Validators.required, Validators.maxLength(255)]],
      email: [
        "",
        [Validators.required, Validators.maxLength(100), Validators.email],
      ],
      senha: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      confirmaremail: [
        "",
        [Validators.required, Validators.maxLength(100), Validators.email],
      ],
      confirmarsenha: [
        "",
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      cpf: [
        "",
        [
          verificarCPFValido,
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(15),
        ],
      ],
      telefoneCelular: [
        "",
        [Validators.minLength(10), Validators.maxLength(15)],
      ],
      dataNascimento: [
        new Date(),
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ],
      ],
      endereco: [''],
      cliente: [''],
      ativo: [true, [Validators.required]],
      tipoAcesso: ["RH_EMPRESA", Validators.required],
    });
    this.formAlterarSenha = this.formBuilder.group({
      idUsuario: [null, [Validators.required]],
      senha: [null, [Validators.required]],
    });
  }

  onRegistroValidar(registro: Usuario) {
    if (!registro.id) {
      //Valida campo e-mail e confirmar e-mail
      if (this.form.get('email').value != this.form.get('confirmaremail').value) {
        this.mensagemService.notificarMensagemAlerta('Atenção!', 'Os e-mail informados não coincidem!');
        return false;
      }

      //Valida preenchimento da senha com valor válido
      this.validarSenha();

      //Valida campo senha e confirmar senha
      if (this.form.get('senha').value != this.form.get('confirmarsenha').value) {
        this.mensagemService.notificarMensagemAlerta('Atenção!', 'As senhas não coincidem!');
        return false;
      }
    }
    return true;
  }

  validarSenha() {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%*()_+^&?]{5,16}$/;
    const senha = this.formAlterarSenha.get("senha").value;
    if (senha !== null) {
      if (regex.test(senha)) {
        this.alterarSenha(senha);
      } else {
        this.messageService.add({
          severity: "warn",
          summary: "Atenção!!",
          detail:
            "A senha deve ter pelo menos 5 e no máximo 16 caracteres, incluindo pelo menos um dígito, uma letra minúscula e uma letra maiúscula.",
          life: 6000,
        });
      }
    } else {
      this.messageService.add({
        severity: "warn",
        summary: "Campo vazio!",
        detail: "Verifique os campos.",
      });
    }
  }

  alterarSenha(senha) {
    this.userCRUDService
      .alterarSenhaAdmin(new AlteracaoSenhaAdmin(this.idUsuario, senha))
      .subscribe(
        () => {
          this.messageService.add({
            severity: "success",
            summary: "Senha alterada com sucesso!",
            detail: "Senha alterada com sucesso",
          });
          this.formAlterarSenha.get("senhaAtual").setValue(null);
          this.formAlterarSenha.get("senhaNova").setValue(null);
          this.formAlterarSenha.get("senhaConfirmacao").setValue(null);
        },
        (error) => {
          this.messageService.add({
            severity: "error",
            summary: "Erro em alterar senha!",
            detail: error.error,
          });
        }
      );
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.idUsuario = this.route.snapshot.paramMap.get("id");
    if (this.idUsuario) {
      this.form.get('senha').setValidators(null);
    }

    this.situacoes = EnumUtils.getLabelValueArray(SimNaoBoolean);
    this.permissoes = EnumUtils.getLabelValueArray(RolesUser);
  }
}
