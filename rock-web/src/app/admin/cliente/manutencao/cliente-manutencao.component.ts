import { Component, Injector, OnInit } from '@angular/core';
import { AbstractControl, Validators } from '@angular/forms';
import { ManutencaoViewBase } from '@boom/ui/views/manutencao-view-base';
import { AreaDeAtuacao, Cliente, NumeroClientes, RamoDeAtuacao } from 'app/modelos/cliente';
import { ClienteCRUDService } from 'app/services/cliente-crud.service';
import { EnumUtils } from 'app/shared/utils/enum-utils';
import { MessageService } from 'primeng';

export function cnpjValidator(control: AbstractControl): { [key: string]: any } | null {
  if (!control.value) {
    return null;
  }

  const cnpj = control.value.replace(/[^\d]+/g, '');

  if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
    return { 'invalidCnpj': true };
  }

  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj[i]) * weight;
    weight--;
    if (weight < 2) {
      weight = 9;
    }
  }
  let digit = 11 - (sum % 11);
  if (digit > 9) {
    digit = 0;
  }
  if (parseInt(cnpj[12]) !== digit) {
    return { 'invalidCnpj': true };
  }

  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj[i]) * weight;
    weight--;
    if (weight < 2) {
      weight = 9;
    }
  }
  digit = 11 - (sum % 11);
  if (digit > 9) {
    digit = 0;
  }
  if (parseInt(cnpj[13]) !== digit) {
    return { 'invalidCnpj': true };
  }

  return null;
}

@Component({
  selector: 'app-cliente-manutencao',
  templateUrl: './cliente-manutencao.component.html',
  styleUrls: ['./cliente-manutencao.component.css']
})
export class ClienteManutencaoComponent extends ManutencaoViewBase<Cliente> implements OnInit {

  optionsNumeroDeColaboradores = [];
  optionsAreaAtuacao = [];
  optionsRamoAtuacao = [];

  constructor(
    protected injector: Injector,
    public clienteCRUDService: ClienteCRUDService,
    private messageService: MessageService) {
      super(injector, clienteCRUDService);
      this.titulo = "Cadastros / Cliente";
      this.form = this.formBuilder.group({
        razaoSocial: [undefined, [Validators.required, Validators.maxLength(255)]],
        nomeFantasia: [undefined, [Validators.required, Validators.maxLength(255)]],
        cnpj: [undefined, [Validators.required, Validators.maxLength(18), cnpjValidator]],
        inscricaoEstadual: [undefined, [Validators.maxLength(20)]],
        telefone: [undefined, [Validators.maxLength(20)]],
        email: [undefined, [Validators.required, Validators.maxLength(100), Validators.email]],
        endereco: [undefined, [Validators.maxLength(255)]],
        enderecoNumero: [undefined, [Validators.maxLength(20)]],
        enderecoBairro: [undefined, [Validators.maxLength(100)]],
        enderecoCep: [undefined, [Validators.maxLength(9)]],
        cidade: [undefined],
        numeroDeColaboradores: [undefined],
        areaDeAtuacao: [undefined],
        ramoDeAtuacao: [undefined],
        responsavelRH: [undefined],
        telefoneResponsavelRH: [undefined],
      });
    }

  ngOnInit(): void {
    this.optionsNumeroDeColaboradores = EnumUtils.getLabelValueArray(NumeroClientes);
    this.optionsAreaAtuacao = EnumUtils.getLabelValueArray(AreaDeAtuacao);
    this.optionsRamoAtuacao = EnumUtils.getLabelValueArray(RamoDeAtuacao);
    
    super.ngOnInit();
  }

  onRegistroValidar(registro: Cliente) {
    if (this.form.get('cnpj').errors?.invalidCnpj) {
      this.mensagemService.notificarFormInvalido("O CNPJ informado não é válido.");
      return false;
    }
    return true;
  }

  

}
