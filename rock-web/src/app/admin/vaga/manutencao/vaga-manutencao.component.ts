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
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { AutenticacaoService } from 'app/autenticacao/services/autenticacao.service';

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
  relatorioBlob: any;

  editando: boolean;
  escolaridadeSelecionada : any;
  tipoContratoSelecionado : any;
  generoSelecionado : any;

  empresa: Empresa = new Empresa();

  registroRelatorio : Vaga = new Vaga();

  constructor(
    protected injector: Injector,
    public autenticacaoService: AutenticacaoService,
    public vagaCRUDService: VagaCRUDService) {
      super(injector, vagaCRUDService);
      this.titulo = "Cadastros / Vaga";
      this.form = this.formBuilder.group({
        empresa: ['', [Validators.required, Validators.maxLength(255)]],
        nomeDaFuncao: ['', [Validators.required, Validators.maxLength(120)]],
        quantidadeDeVagas: ['', [Validators.required, Validators.min(1)]],
        vagaSigilosa: [false],
        dataLimiteSelecao: ['', [Validators.required]],
        dataLimiteIntegracao: ['', [Validators.required]],
        situacao: ["PENDENTE", [Validators.required]],
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
        comissoesBonus: [false],
        valeAlimentacao: [''],
        valeTransporte: [''],
        valeRefeicao: [''],
        trabalhaSegunda: [false],
        segundaFeiraInicio: [''],
        segundaFeiraFim: [''],
        contraturnoSegundaInicio: [''],
        contraturnoSegundaFim: [''],
        trabalhaTerca: [false],
        tercaFeiraInicio: [''],
        tercaFeiraFim: [''],
        contraturnoTercaInicio: [''],
        contraturnoTercaFim: [''],
        trabalhaQuarta: [false],
        quartaFeiraInicio: [''],
        quartaFeiraFim: [''],
        contraturnoQuartaInicio: [''],
        contraturnoQuartaFim: [''],
        trabalhaQuinta: [false],
        quintaFeiraInicio: [''],
        quintaFeiraFim: [''],
        contraturnoQuintaInicio: [''],
        contraturnoQuintaFim: [''],
        trabalhaSexta: [false],
        sextaFeiraInicio: [''],
        sextaFeiraFim: [''],
        contraturnoSextaInicio: [''],
        contraturnoSextaFim: [''],
        trabalhaSabado: [false],
        sabadoInicio: [''],
        sabadoFim: [''],
        contraturnoSabadoInicio: [''],
        contraturnoSabadoFim: [''],
        trabalhaDomingo: [false],
        domingoInicio: [''],
        domingoFim: [''],
        contraturnoDomingoInicio: [''],
        contraturnoDomingoFim: [''],
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

    this.form.get('comissoesBonus').disable();
    this.form.get('comissoesBonus').setValue(null);

    this.escolaridadeSelecionada = "SEM_NIVEL_EXIGIDO";
    this.tipoContratoSelecionado = "CLT";
    this.generoSelecionado = "IGNORADO";

    this.form.get('escolaridade').updateValueAndValidity();
    this.form.get('tipoContrato').updateValueAndValidity();
    this.form.get('genero').updateValueAndValidity();

    this.form.get('genero').valueChanges.subscribe(value => {
      console.log(value)
    })
    
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
  
  onRegistroNovo() {
    this.editando = false;

    this.escolaridadeSelecionada = "SEM_NIVEL_EXIGIDO";
    this.tipoContratoSelecionado = "CLT";
    this.generoSelecionado = "IGNORADO";

    this.form.get('escolaridade').updateValueAndValidity();
    this.form.get('tipoContrato').updateValueAndValidity();
    this.form.get('genero').updateValueAndValidity();
  }

  onRegistroCarregado(registro: Vaga) {
    this.registro = registro;
    this.registroRelatorio.copiarValores(this.registro);
    this.editando = true;
    this.changeHabilitaComissoes();

    this.escolaridadeSelecionada = registro.escolaridade;
    this.tipoContratoSelecionado = registro.tipoContrato;
    this.generoSelecionado = registro.genero;

    this.form.get('escolaridade').updateValueAndValidity();
    this.form.get('tipoContrato').updateValueAndValidity();
    this.form.get('genero').updateValueAndValidity();
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
      this.form.get('contraturnoDomingoInicio').setValue(null);
      this.form.get('contraturnoDomingoInicio').updateValueAndValidity();
      this.form.get('contraturnoDomingoFim').setValue(null);
      this.form.get('contraturnoDomingoFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaSegunda').value == false) {
      this.form.get('segundaFeiraInicio').setValue(null);
      this.form.get('segundaFeiraInicio').updateValueAndValidity();
      this.form.get('segundaFeiraFim').setValue(null);
      this.form.get('segundaFeiraFim').updateValueAndValidity();
      this.form.get('contraturnoSegundaInicio').setValue(null);
      this.form.get('contraturnoSegundaFim').setValue(null);
      this.form.get('contraturnoSegundaInicio').updateValueAndValidity();
      this.form.get('contraturnoSegundaFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaTerca').value == false) {
      this.form.get('tercaFeiraInicio').setValue(null);
      this.form.get('tercaFeiraInicio').updateValueAndValidity();
      this.form.get('tercaFeiraFim').setValue(null);
      this.form.get('tercaFeiraFim').updateValueAndValidity();
      this.form.get('contraturnoTercaInicio').setValue(null);
      this.form.get('contraturnoTercaFim').setValue(null);
      this.form.get('contraturnoTercaInicio').updateValueAndValidity();
      this.form.get('contraturnoTercaFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaQuarta').value == false) {
      this.form.get('quartaFeiraInicio').setValue(null);
      this.form.get('quartaFeiraInicio').updateValueAndValidity();
      this.form.get('quartaFeiraFim').setValue(null);
      this.form.get('quartaFeiraFim').updateValueAndValidity();
      this.form.get('contraturnoQuartaInicio').setValue(null);
      this.form.get('contraturnoQuartaFim').setValue(null);
      this.form.get('contraturnoQuartaInicio').updateValueAndValidity();
      this.form.get('contraturnoQuartaFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaQuinta').value == false) {
      this.form.get('quintaFeiraInicio').setValue(null);
      this.form.get('quintaFeiraInicio').updateValueAndValidity();
      this.form.get('quintaFeiraFim').setValue(null);
      this.form.get('quintaFeiraFim').updateValueAndValidity();
      this.form.get('contraturnoQuintaInicio').setValue(null);
      this.form.get('contraturnoQuintaFim').setValue(null);
      this.form.get('contraturnoQuintaInicio').updateValueAndValidity();
      this.form.get('contraturnoQuintaFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaSexta').value == false) {
      this.form.get('sextaFeiraInicio').setValue(null);
      this.form.get('sextaFeiraInicio').updateValueAndValidity();
      this.form.get('sextaFeiraFim').setValue(null);
      this.form.get('sextaFeiraFim').updateValueAndValidity();
      this.form.get('contraturnoSextaInicio').setValue(null);
      this.form.get('contraturnoSextaFim').setValue(null);
      this.form.get('contraturnoSextaInicio').updateValueAndValidity();
      this.form.get('contraturnoSextaFim').updateValueAndValidity();
    }
    if (this.form.get('trabalhaSabado').value == false) {
      this.form.get('sabadoInicio').setValue(null);
      this.form.get('sabadoInicio').updateValueAndValidity();
      this.form.get('sabadoFim').setValue(null);
      this.form.get('sabadoFim').updateValueAndValidity();
      this.form.get('contraturnoSabadoInicio').setValue(null);
      this.form.get('contraturnoSabadoFim').setValue(null);
      this.form.get('contraturnoSabadoInicio').updateValueAndValidity();
      this.form.get('contraturnoSabadoFim').updateValueAndValidity();
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

  replicarHorarios() {
    this.form.get('trabalhaTerca').setValue(this.form.get('trabalhaSegunda').value);
    this.form.get('tercaFeiraInicio').setValue(this.form.get('segundaFeiraInicio').value);
    this.form.get('tercaFeiraFim').setValue(this.form.get('segundaFeiraFim').value);
    this.form.get('contraturnoTercaInicio').setValue(this.form.get('contraturnoSegundaInicio').value);
    this.form.get('contraturnoTercaFim').setValue(this.form.get('contraturnoSegundaFim').value);

    this.form.get('trabalhaQuarta').setValue(this.form.get('trabalhaSegunda').value);
    this.form.get('quartaFeiraInicio').setValue(this.form.get('segundaFeiraInicio').value);
    this.form.get('quartaFeiraFim').setValue(this.form.get('segundaFeiraFim').value);
    this.form.get('contraturnoQuartaInicio').setValue(this.form.get('contraturnoSegundaInicio').value);
    this.form.get('contraturnoQuartaFim').setValue(this.form.get('contraturnoSegundaFim').value);
    
    this.form.get('trabalhaQuinta').setValue(this.form.get('trabalhaSegunda').value);
    this.form.get('quintaFeiraInicio').setValue(this.form.get('segundaFeiraInicio').value);
    this.form.get('quintaFeiraFim').setValue(this.form.get('segundaFeiraFim').value);
    this.form.get('contraturnoQuintaInicio').setValue(this.form.get('contraturnoSegundaInicio').value);
    this.form.get('contraturnoQuintaFim').setValue(this.form.get('contraturnoSegundaFim').value);
    
    this.form.get('trabalhaSexta').setValue(this.form.get('trabalhaSegunda').value);
    this.form.get('sextaFeiraInicio').setValue(this.form.get('segundaFeiraInicio').value);
    this.form.get('sextaFeiraFim').setValue(this.form.get('segundaFeiraFim').value);
    this.form.get('contraturnoSextaInicio').setValue(this.form.get('contraturnoSegundaInicio').value);
    this.form.get('contraturnoSextaFim').setValue(this.form.get('contraturnoSegundaFim').value);
    
    this.form.get('trabalhaSabado').setValue(this.form.get('trabalhaSegunda').value);
    this.form.get('sabadoInicio').setValue(this.form.get('segundaFeiraInicio').value);
    this.form.get('sabadoFim').setValue(this.form.get('segundaFeiraFim').value);
    this.form.get('contraturnoSabadoInicio').setValue(this.form.get('contraturnoSegundaInicio').value);
    this.form.get('contraturnoSabadoFim').setValue(this.form.get('contraturnoSegundaFim').value);
    
    this.form.get('trabalhaDomingo').setValue(this.form.get('trabalhaSegunda').value);
    this.form.get('domingoInicio').setValue(this.form.get('segundaFeiraInicio').value);
    this.form.get('domingoFim').setValue(this.form.get('segundaFeiraFim').value);
    this.form.get('contraturnoDomingoInicio').setValue(this.form.get('contraturnoSegundaInicio').value);
    this.form.get('contraturnoDomingoFim').setValue(this.form.get('contraturnoSegundaFim').value);
  }

  abrirRelatorio() {
    let component: HTMLElement = document.querySelector('#relatorio');
    let a: any = document.querySelector('#teste');
    a.style.display = 'block';

    window.scroll(0, 0);
    html2canvas(component).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 200;
      const pageHeight = 285;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;

      const doc = new jsPDF('p', 'mm');
      let position = 5;

      doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 5, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      this.relatorioBlob = undefined;
      doc.save('Relatorio.pdf');
    });
    a.style.display = 'none';
  }

  get dataHoraAtual(): string {
    return DateUtils.formatDateTime(new Date());
  }
}
