import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SimNaoBoolean } from '@boom/modelos/sim-nao';
import { MensagemService } from '@boom/services/programa/mensagem.service';
import { ManutencaoViewBase } from '@boom/ui/views/manutencao-view-base';
import { Cliente } from 'app/modelos/cliente';
import { Escolaridade } from 'app/modelos/vaga/escolaridade';
import { Situacao } from 'app/modelos/vaga/situacao';
import { TipoContrato } from 'app/modelos/vaga/tipoContrato';
import { Vaga } from 'app/modelos/vaga/vaga';
import { VagaCRUDService } from 'app/services/vaga/vaga-crud.service';
import { EnumUtils } from 'app/shared/utils/enum-utils';
import { MessageService } from 'primeng';

@Component({
  selector: 'app-vaga-manutencao',
  templateUrl: './vaga-manutencao.component.html'
})
export class VagaManutencaoComponent extends ManutencaoViewBase<Vaga> implements OnInit {

  optionsSimNao = [];
  opcoesEscolaridade = [];
  opcoesTipoContrato = [];
  opcoesSituacoes = [];

  vagaSigilosa: any;
  escolaridadeSelecionada : any;
  tipoContratoSelecionado : any;

  cliente: Cliente = new Cliente();

  constructor(
    protected injector: Injector,
    public vagaCRUDService: VagaCRUDService) {
      super(injector, vagaCRUDService);
      this.titulo = "Cadastros / Vaga";
      this.form = this.formBuilder.group({
        cliente: ['', [Validators.required, Validators.maxLength(255)]],
        nomeDaFuncao: ['', [Validators.required, Validators.maxLength(120)]],
        quantidadeDeVagas: ['', [Validators.required]],
        vagaSigilosa: [false, [Validators.required]],
        dataLimiteSelecao: ['', [Validators.required]],
        dataLimiteIntegracao: ['', [Validators.required]],
        situacao: ['PENDENTE', [Validators.required]],
        atribuicaoSumaria: ['', [Validators.maxLength(3000)]],
        atividadesTipicas: ['', [Validators.maxLength(3000)]],
        atividadesEventuais: ['', [Validators.maxLength(3000)]],
        nivelAutoridadeResponsabilidade: ['', [Validators.maxLength(3000)]],
        habilidadesNecessarias: ['', [Validators.maxLength(3000)]],
        requisitosBasicos: ['', [Validators.maxLength(3000)]],
        requisitosDesejaveis: ['', [Validators.maxLength(3000)]],
        escolaridade: ["SEM_NIVEL_EXIGIDO", [Validators.required]],
        cursosObrigatorios: ['', [Validators.maxLength(3000)]],
        tipoContrato: ["CLT", [Validators.required]],
        cargaHorariaSemanal: ['', [Validators.required]],
        remuneracao: ['', [Validators.maxLength(3000)]],
      }, { validator: this.validacaoFormVaga });
    }

    validacaoFormVaga(form: FormGroup) {
    const startDate = form.get('dataLimiteSelecao').value;
    const endDate = form.get('dataLimiteIntegracao').value;
    
    form.get('dataLimiteIntegracao').setErrors(null);

    if (startDate && endDate && startDate > endDate) {
      form.get('dataLimiteIntegracao').setErrors({ dataMinima: { min: form.get('dataLimiteSelecao').value } });
      return { dateError: true };
    }
  
    return null;
  }

  ngOnInit(): void {
    this.form.get('cliente').valueChanges.subscribe(value => {
      this.cliente = value;
    });
    
    this.optionsSimNao = EnumUtils.getLabelValueArray(SimNaoBoolean);
    this.opcoesEscolaridade = EnumUtils.getLabelValueArray(Escolaridade);
    this.opcoesTipoContrato = EnumUtils.getLabelValueArray(TipoContrato);
    this.opcoesSituacoes = EnumUtils.getLabelValueArray(Situacao);

    this.vagaSigilosa = "false";
    this.escolaridadeSelecionada = "SEM_NIVEL_EXIGIDO";
    this.tipoContratoSelecionado = "CLT"

    super.ngOnInit();
  }

  enderecoCompleto(): string {
    const enderecoFormatado: string[] = [];
  
    if (this.cliente.endereco) {
      enderecoFormatado.push(this.cliente.endereco);
    }

    if (this.cliente.enderecoNumero) {
      enderecoFormatado.push(this.cliente.enderecoNumero);
    }

    if (this.cliente.enderecoBairro) {
      enderecoFormatado.push(this.cliente.enderecoBairro);
    }

    if (this.cliente.enderecoCep) {
      enderecoFormatado.push(this.cliente.enderecoCep);
    }
  
    return enderecoFormatado.join(', ');
  }

  getCnpj(): string {
    if (this.cliente?.cnpj) {
      return this.cliente?.cnpj;
    }
    return '';
  }
  
  getNomeFantasia(): string {
    if (this.cliente?.nomeFantasia) {
      return this.cliente?.nomeFantasia;
    }
    return '';
  }
}
