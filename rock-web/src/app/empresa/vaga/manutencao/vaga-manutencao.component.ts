import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SimNaoBoolean } from '@boom/modelos/sim-nao';
import { MensagemService } from '@boom/services/programa/mensagem.service';
import { ManutencaoViewBase } from '@boom/ui/views/manutencao-view-base';
import { AutenticacaoService } from 'app/autenticacao/services/autenticacao.service';
import { Empresa } from 'app/modelos/empresa';
import { Escolaridade } from 'app/modelos/vaga/escolaridade';
import { Genero } from 'app/modelos/vaga/genero';
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
  opcoesGenero = [];

  editando: boolean;
  vagaSigilosa: any;
  escolaridadeSelecionada : any;
  tipoContratoSelecionado : any;
  generoSelecionado : any;

  empresa: Empresa = new Empresa();

  constructor(
    protected injector: Injector,
    public autenticacaoService: AutenticacaoService,
    public vagaCRUDService: VagaCRUDService) {
      super(injector, vagaCRUDService);
      this.titulo = "Cadastros / Vaga";
      this.form = this.formBuilder.group({
        empresa: ['', [Validators.required, Validators.maxLength(255)]],
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
        informaComissoesBonus: [false, [Validators.required]],
        comissoesBonus: [''],
        valeAlimentacao: [''],
        valeTransporte: [''],
        valeRefeicao: [''],
        segundaFeiraInicio: [''],
        segundaFeiraFim: [''],
        tercaFeiraInicio: [''],
        tercaFeiraFim: [''],
        quartaFeiraInicio: [''],
        quartaFeiraFim: [''],
        quintaFeiraInicio: [''],
        quintaFeiraFim: [''],
        sextaFeiraInicio: [''],
        sextaFeiraFim: [''],
        sabadoInicio: [''],
        sabadoFim: [''],
        domingoInicio: [''],
        domingoFim: [''],
        genero: ["IGNORADO", [Validators.required]],
        dataInclusao: [''],
        sequencialEmpresa: [''],
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
    this.form.get('empresa').setValue(this.autenticacaoService.loginInfo.usuario.empresa);

    this.form.get('situacao').disable();
    this.form.get('situacao').updateValueAndValidity();

    this.empresa = this.autenticacaoService.loginInfo.usuario.empresa;
    
    this.optionsSimNao = EnumUtils.getLabelValueArray(SimNaoBoolean);
    this.opcoesEscolaridade = EnumUtils.getLabelValueArray(Escolaridade);
    this.opcoesTipoContrato = EnumUtils.getLabelValueArray(TipoContrato);
    this.opcoesSituacoes = EnumUtils.getLabelValueArray(Situacao);
    this.opcoesGenero = EnumUtils.getLabelValueArray(Genero);

    this.vagaSigilosa = "false";
    this.escolaridadeSelecionada = "SEM_NIVEL_EXIGIDO";
    this.tipoContratoSelecionado = "CLT";
    this.generoSelecionado = 'IGNORADO';

    this.form.get('comissoesBonus').disable();
    this.form.get('comissoesBonus').setValue(null);
    
    super.ngOnInit();
  }

  enderecoCompleto(): string {
    const enderecoFormatado: string[] = [];
  
    if (this.empresa.endereco) {
      enderecoFormatado.push(this.empresa.endereco);
    }

    if (this.empresa.enderecoNumero) {
      enderecoFormatado.push(this.empresa.enderecoNumero);
    }

    if (this.empresa.enderecoBairro) {
      enderecoFormatado.push(this.empresa.enderecoBairro);
    }

    if (this.empresa.enderecoCep) {
      enderecoFormatado.push(this.empresa.enderecoCep);
    }
  
    return enderecoFormatado.join(', ');
  }

  getCnpj(): string {
    if (this.empresa?.cnpj) {
      return this.empresa?.cnpj;
    }
    return '';
  }
  
  getNomeFantasia(): string {
    if (this.empresa?.nomeFantasia) {
      return this.empresa?.nomeFantasia;
    }
    return '';
  }
  
  onNovo() {
    this.editando = false;
  }

  onRegistroCarregado(registro: Vaga) {
    this.editando = true;
    this.changeHabilitaComissoes();
  }

  changeHabilitaComissoes() {
    if (this.form.get('informaComissoesBonus').value === false) {
      this.form.get('comissoesBonus').disable();
      this.form.get('comissoesBonus').setValue(null);
    } else {
      this.form.get('comissoesBonus').enable();
    }
    this.form.get('comissoesBonus').updateValueAndValidity();
  }

  get empresaVaga() {
    return this.form.get('empresa').value as Empresa;
  }

  get sequencialEmpresa() {
    const ano = this.form.get('dataInclusao').value.getFullYear();
    const idEmpresa = this.empresa.id.toString().padStart(2, '0');
    const sequencialEmpresa = this.form.get('sequencialEmpresa').value.toString().padStart(3, '0');

    return `${ano}${idEmpresa}${sequencialEmpresa}`;
  }
}
