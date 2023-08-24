import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { SimNaoBoolean } from '@boom/modelos/sim-nao';
import { MensagemService } from '@boom/services/programa/mensagem.service';
import { ManutencaoViewBase } from '@boom/ui/views/manutencao-view-base';
import { Empresa } from 'app/modelos/empresa';
import { Escolaridade } from 'app/modelos/vaga/escolaridade';
import { Genero } from 'app/modelos/vaga/genero';
import { Situacao } from 'app/modelos/vaga/situacao';
import { TipoContrato } from 'app/modelos/vaga/tipoContrato';
import { Vaga } from 'app/modelos/vaga/vaga';
import { VagaCRUDService } from 'app/services/vaga/vaga-crud.service';
import { DateUtils } from 'app/shared/utils/date-utils';
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

  abrirRelatorioSalvo: boolean = false;

  empresa: Empresa = new Empresa();

  constructor(
    protected injector: Injector,
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
        trabalhaSegunda: [false],
        segundaFeiraInicio: [''],
        segundaFeiraFim: [''],
        trabalhaTerca: [false],
        tercaFeiraInicio: [''],
        tercaFeiraFim: [''],
        trabalhaQuarta: [false],
        quartaFeiraInicio: [''],
        quartaFeiraFim: [''],
        trabalhaQuinta: [false],
        quintaFeiraInicio: [''],
        quintaFeiraFim: [''],
        trabalhaSexta: [false],
        sextaFeiraInicio: [''],
        sextaFeiraFim: [''],
        trabalhaSabado: [false],
        sabadoInicio: [''],
        sabadoFim: [''],
        trabalhaDomingo: [false],
        domingoInicio: [''],
        domingoFim: [''],
        informacoesRock: [''],
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
    this.form.get('empresa').valueChanges.subscribe(value => {
      this.empresa = value;
    });
    
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
    this.abrirRelatorioSalvo = false;
  }

  onRegistroIncluido(registroId: number) {
    this.abrirRelatorioSalvo = true;
  }


  onRegistroAtualizado(registroId: number) {
    this.abrirRelatorioSalvo = true;
  }

  onRegistroCarregado(registro: Vaga) {
    this.registro = registro;
    this.editando = true;
    this.changeHabilitaComissoes();
    if (this.abrirRelatorioSalvo) {
      this.abrirRelatorio();
      this.abrirRelatorioSalvo = false;
    }
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

  changeDiasSemana() {
    if (this.form.get('trabalhaDomingo').value == false) {
      this.form.get('domingoInicio').setValue(null);
      this.form.get('domingoInicio').updateValueAndValidity();
      this.form.get('domingoFim').setValue(null);
      this.form.get('domingoFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaSegunda').value == false) {
      this.form.get('segundaFeiraInicio').setValue(null);
      this.form.get('segundaFeiraInicio').updateValueAndValidity();
      this.form.get('segundaFeiraFim').setValue(null);
      this.form.get('segundaFeiraFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaTerca').value == false) {
      this.form.get('tercaFeiraInicio').setValue(null);
      this.form.get('tercaFeiraInicio').updateValueAndValidity();
      this.form.get('tercaFeiraFim').setValue(null);
      this.form.get('tercaFeiraFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaQuarta').value == false) {
      this.form.get('quartaFeiraInicio').setValue(null);
      this.form.get('quartaFeiraInicio').updateValueAndValidity();
      this.form.get('quartaFeiraFim').setValue(null);
      this.form.get('quartaFeiraFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaQuinta').value == false) {
      this.form.get('quintaFeiraInicio').setValue(null);
      this.form.get('quintaFeiraInicio').updateValueAndValidity();
      this.form.get('quintaFeiraFim').setValue(null);
      this.form.get('quintaFeiraFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaSexta').value == false) {
      this.form.get('sextaFeiraInicio').setValue(null);
      this.form.get('sextaFeiraInicio').updateValueAndValidity();
      this.form.get('sextaFeiraFim').setValue(null);
      this.form.get('sextaFeiraFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaSabado').value == false) {
      this.form.get('sabadoInicio').setValue(null);
      this.form.get('sabadoInicio').updateValueAndValidity();
      this.form.get('sabadoFim').setValue(null);
      this.form.get('sabadoFim').updateValueAndValidity();
    }
  }

  get empresaVaga() {
    return this.form.get('empresa').value as Empresa;
  }

  get sequencialEmpresa() {
    const ano = this.form.get('dataInclusao').value.getFullYear();
    const idEmpresa = this.empresa.id.toString().padStart(2, '0');
    const sequencialEmpresa = this.form.get('sequencialEmpresa').value.toString().padStart(3, '0');

    return `${ano}${sequencialEmpresa}${idEmpresa}`;
  }

  abrirRelatorio() {
    const relatorioWindow = window.open('', '_blank');
    if (relatorioWindow) {
      relatorioWindow.document.write(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Relatório de Vaga</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  margin-left: 20px;
                  margin-right: 20px;
                  margin-bottom: 50px;
              }
              .header {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  flex-direction: column;
                  font-size: 24px;
                  margin-bottom: 20px;
              }
              .section {
                  margin-bottom: 20px;
              }
              .section-title {
                  font-size: 16px;
                  font-weight: bold;
                  margin-bottom: 5px;
              }
              .section-content {
                  font-size: 12px;
                  border: 1px solid #ccc;
                  padding: 10px;
              }
          </style>
      </head>
      <body>
          <div class="header">
            <img src="assets/imagens/logo.png" style="max-width:150px;max-height:150px" />
            <span>Relatório de Vaga</span>
          </div>
          <div class="section">
              <div class="section-title">Dados Gerais</div>
              <div class="section-content">
                  <div><b>Empresa:</b> ${this.registro.empresa.razaoSocial}</div>
                  <div><b>Nome da Função:</b> ${this.registro.nomeDaFuncao}</div>
                  <div><b>Quantidade de Vagas:</b> ${this.registro.quantidadeDeVagas ? this.registro.quantidadeDeVagas : 'Não Informado'}</div>
                  <div><b>Vaga Sigilosa:</b> ${this.registro.vagaSigilosa ? 'Sim' : 'Não' }</div>
                  <div><b>Gênero:</b> ${Genero[this.registro.genero]}</div>
                  <div><b>Data de Inclusão:</b> ${DateUtils.formatDateTime(this.registro.dataInclusao)}</div>
              </div>
          </div>
          <div class="section">
              <div class="section-title">Prazos</div>
              <div class="section-content">
                  <div><b>Data Limite de Seleção:</b> ${DateUtils.formatDate(this.registro.dataLimiteSelecao)}</div>
                  <div><b>Data Limite de Integração:</b> ${DateUtils.formatDate(this.registro.dataLimiteIntegracao)}</div>
                  <div><b>Situação:</b> ${Situacao[this.registro.situacao]}</div>
              </div>
          </div>
          <div class="section">
              <div class="section-title">Descrição</div>
              <div class="section-content">
                  <div><b>Atribuição Sumária: </b> ${this.registro.atribuicaoSumaria}</div>
                  <div><b>Atividades Típicas: </b> ${this.registro.atividadesTipicas}</div>
                  <div><b>Atividades Eventuais: </b> ${this.registro.atividadesEventuais}</div>
                  <div><b>Nível de Autoridade e Responsabilidade: </b> ${this.registro.nivelAutoridadeResponsabilidade}</div>
                  <div><b>Habilidades Necessárias: </b> ${this.registro.habilidadesNecessarias}</div>
                  <div><b>Requisitos Básicos: </b> ${this.registro.requisitosBasicos}</div>
                  <div><b>Requisitos Desejáveis: </b> ${this.registro.requisitosDesejaveis}</div>
                  <div><b>Escolaridade: </b> ${Escolaridade[this.registro.escolaridade]}</div>
                  <div><b>Cursos Obrigatórios: </b> ${this.registro.cursosObrigatorios}</div>
                  <div><b>Tipo de Contrato: </b> ${TipoContrato[this.registro.tipoContrato]}</div>
                  <div><b>Carga Horária Semanal: </b> ${this.registro.cargaHorariaSemanal}</div>
                  <div><b>Remuneração: </b> ${this.registro.remuneracao}</div>
                  <div><b>Comissões e Bônus: </b> ${this.registro.informaComissoesBonus ? this.registro.comissoesBonus : 'Não informado'}</div>
                  <div><b>Vale Alimentação: </b> ${this.registro.valeAlimentacao ? 'Sim' : 'Não'}</div>
                  <div><b>Vale Transporte: </b> ${this.registro.valeTransporte ? 'Sim' : 'Não'}</div>
                  <div><b>Vale Refeição: </b> ${this.registro.valeRefeicao ? 'Sim' : 'Não'}</div>
              </div>
          </div>
          <div class="section">
            <div class="section-title">Dias da Semana</div>
            <div class="section-content">
              <div><b>Segunda-Feira:</b> ${this.registro.trabalhaSegunda ? DateUtils.formatTime(this.registro.segundaFeiraInicio) + ' - ' + DateUtils.formatTime(this.registro.segundaFeiraFim) : 'Não'}</div>
              <div><b>Terça:</b> ${this.registro.trabalhaTerca ? DateUtils.formatTime(this.registro.tercaFeiraInicio) + ' - ' + DateUtils.formatTime(this.registro.tercaFeiraFim) : 'Não'}</div>
              <div><b>Quarta:</b> ${this.registro.trabalhaQuarta ? DateUtils.formatTime(this.registro.quartaFeiraInicio) + ' - ' + DateUtils.formatTime(this.registro.quartaFeiraFim) : 'Não'}</div>
              <div><b>Quinta:</b> ${this.registro.trabalhaQuinta ? DateUtils.formatTime(this.registro.quintaFeiraInicio) + ' - ' + DateUtils.formatTime(this.registro.quintaFeiraFim) : 'Não'}</div>
              <div><b>Sexta:</b> ${this.registro.trabalhaSexta ? DateUtils.formatTime(this.registro.sextaFeiraInicio) + ' - ' + DateUtils.formatTime(this.registro.sextaFeiraFim) : 'Não'}</div>
              <div><b>Sábado:</b> ${this.registro.trabalhaSabado ? DateUtils.formatTime(this.registro.sabadoInicio) + ' - ' + DateUtils.formatTime(this.registro.sabadoInicio) : 'Não'}</div>
              <div><b>Domingo:</b> ${this.registro.trabalhaDomingo ? DateUtils.formatTime(this.registro.domingoInicio) + ' - ' + DateUtils.formatTime(this.registro.domingoFim) : 'Não'}</div>
            </div>
          </div>
      </body>
      </html>
      `);
      relatorioWindow.document.close();
    }
  }
}
