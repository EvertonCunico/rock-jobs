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
import { AutenticacaoService } from "app/autenticacao/services/autenticacao.service";
import { distinctUntilChanged } from "rxjs/operators";

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

export function textoValidoValidator(control: AbstractControl): { [key: string]: any } | null {
  const texto = control.value;
  const regex = /^[a-zA-Z\s]*$/; // Permite apenas letras e espaços em branco

  if (!regex.test(texto)) {
    return { textoInvalido: true };
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
  acoes = {incluir: true, atualizar: true, deletar: true, visualizar: false, pesquisar: true, cancelar: true};
  permissoes = [];

  formAlterarSenha: FormGroup;

  constructor(
    protected injector: Injector,
    public userCRUDService: UsuarioCRUDService,
    private messageService: MessageService,
    private autenticacaoService: AutenticacaoService
  ) {
    super(injector, userCRUDService);
    this.titulo = "Cadastros / Usuário";
    this.form = this.formBuilder.group({
      nome: [undefined, [Validators.required, 
        Validators.minLength(3), Validators.maxLength(255), textoValidoValidator]],
      sobrenome: [undefined, [Validators.required, 
        Validators.minLength(3),Validators.maxLength(255), textoValidoValidator]],
      email: [
        undefined,
        [Validators.required, Validators.maxLength(100), Validators.email],
      ],
      senha: [
        undefined,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      confirmaremail: [
        undefined,
        [Validators.required, Validators.maxLength(100), Validators.email],
      ],
      confirmarsenha: [
        undefined,
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(100),
        ],
      ],
      cpf: [
        undefined,
        [
          verificarCPFValido,
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(15),
        ],
      ],
      telefoneCelular: [
        undefined,
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
      endereco: [undefined],
      complemento: [''],
      empresa: [undefined, [Validators.required]],
      ativo: [true, [Validators.required]],
      tipoAcesso: ["RH_EMPRESA", Validators.required],
      dataInclusao: ['']
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

      //Valida campo senha e confirmar senha
      if (this.form.get('senha').value != this.form.get('confirmarsenha').value) {
        this.mensagemService.notificarMensagemAlerta('Atenção!', 'As senhas não coincidem!');
        return false;
      }

      //Valida preenchimento da senha com valor válido
      return this.validarSenha(true);
    }
    return true;
  }

  validarSenha(inclusao) {
    var senha = "";
    if (inclusao) {
      senha = this.form.get("senha").value;
    } else {
      senha = this.formAlterarSenha.get("senha").value;
    }
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%*()_+^&?]{5,}$/;
    if (senha !== null) {
      if (regex.test(senha)) {
        if (!inclusao) {
          this.alterarSenha(senha);
        }
        return true;
      } else {
        this.messageService.add({
          severity: "warn",
          summary: "Atenção!!",
          detail:
            "A senha deve ter pelo menos 5 caracteres, incluindo pelo menos um dígito, uma letra minúscula e uma letra maiúscula.",
          life: 6000,
        });
        return false;
      }
    } else {
      this.mensagemService.notificarFormInvalido('Senha não informada');
      return false;
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

    if (this.autenticacaoService.loginInfo.usuario.id == this.idUsuario) {
      this.acoes.deletar = false;
    }

    if (this.idUsuario) {
      this.tratarCamposEdicao();
    } else {
      this.form.get('empresa').setValue(this.autenticacaoService.loginInfo.usuario.empresa);
    }
    this.desabilitarEmpresa();

    this.form.get('email').valueChanges
    .pipe(distinctUntilChanged())
    .subscribe(value => {
      this.form.get('confirmaremail').setValue(null);
    });

    this.situacoes = EnumUtils.getLabelValueArray(SimNaoBoolean);
    this.permissoes = EnumUtils.getLabelValueArrayComIgnore(RolesUser, [RolesUser.ADMIN_GERAL.toString()]);
  }

  onRegistroCarregado(registro: Usuario) {
    this.tratarCamposEdicao();
  }

  tratarCamposEdicao() {
    this.form.get('senha').setValidators(null);
    this.form.get('senha').updateValueAndValidity();
    this.form.get('confirmarsenha').setValidators(null);
    this.form.get('confirmarsenha').updateValueAndValidity();
    this.form.get('confirmaremail').setValue(this.form.get('email').value);
    this.form.get('confirmaremail').markAsTouched();
    this.form.get('confirmaremail').updateValueAndValidity();
  }

  desabilitarEmpresa() {
    this.form.get('empresa').disable();
    this.form.get('empresa').markAsTouched();
    this.form.get('empresa').updateValueAndValidity();
  }
}
