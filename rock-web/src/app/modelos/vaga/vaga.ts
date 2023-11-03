import { Modelo } from '@boom/modelos/modelo';
import { Empresa } from '../empresa';
import { Escolaridade } from './escolaridade';
import { TipoContrato } from './tipoContrato';
import { Situacao } from './situacao';
import { Genero } from './genero';
import { DateUtils } from 'app/shared/utils/date-utils';

export class Vaga extends Modelo {
    empresa: Empresa;
    url?: string;
    nomeDaFuncao: string;
    quantidadeDeVagas: number;
    vagaSigilosa: boolean;
    dataLimiteSelecao: Date;
    dataLimiteIntegracao: Date;
    situacao: Situacao;
    atribuicaoSumaria: string;
    atividadesTipicas: string;
    atividadesEventuais: string;
    nivelAutoridadeResponsabilidade: string;
    habilidadesNecessarias: string;
    requisitosBasicos: string;
    requisitosDesejaveis: string;
    escolaridade: Escolaridade;
    cursosObrigatorios: string;
    tipoContrato: TipoContrato;
    cargaHorariaSemanal: number;
    remuneracao: string;
    informaComissoesBonus: boolean;
    comissoesBonus: string;
    valeAlimentacao: boolean;
    valeTransporte: boolean;
    valeRefeicao: boolean;
    trabalhaSegunda:boolean;
    segundaFeiraInicio: Date;
    segundaFeiraFim: Date;
    contraturnoSegundaInicio: string;
    contraturnoSegundaFim: string;
    trabalhaTerca:boolean;
    tercaFeiraInicio: string;
    tercaFeiraFim: string;
    contraturnoTercaInicio: string;
    contraturnoTercaFim: string;
    trabalhaQuarta:boolean;
    quartaFeiraInicio: string;
    quartaFeiraFim: string;
    contraturnoQuartaInicio: string;
    contraturnoQuartaFim: string;
    trabalhaQuinta:boolean;
    quintaFeiraInicio: string;
    quintaFeiraFim: string;
    contraturnoQuintaInicio: string;
    contraturnoQuintaFim: string;
    trabalhaSexta:boolean;
    sextaFeiraInicio: string;
    sextaFeiraFim: string;
    contraturnoSextaInicio: string;
    contraturnoSextaFim: string;
    trabalhaSabado:boolean;
    sabadoInicio: string;
    sabadoFim: string;
    contraturnoSabadoInicio: string;
    contraturnoSabadoFim: string;
    trabalhaDomingo:boolean;
    domingoInicio: string;
    domingoFim: string;
    contraturnoDomingoInicio: string;
    contraturnoDomingoFim: string;
    informacoesRock: string;
    genero: Genero;
    dataInclusao: Date;
    sequencialEmpresa: number;

    copiarValores(vaga: Vaga) {
        this.empresa = vaga.empresa;
        this.url = vaga.url;
        this.nomeDaFuncao = vaga.nomeDaFuncao;
        this.quantidadeDeVagas = vaga.quantidadeDeVagas;
        this.vagaSigilosa = vaga.vagaSigilosa;
        this.dataLimiteSelecao = new Date(vaga.dataLimiteSelecao);
        this.dataLimiteIntegracao = new Date(vaga.dataLimiteIntegracao);
        this.situacao = vaga.situacao;
        this.atribuicaoSumaria = vaga.atribuicaoSumaria;
        this.atividadesTipicas = vaga.atividadesTipicas;
        this.atividadesEventuais = vaga.atividadesEventuais;
        this.nivelAutoridadeResponsabilidade = vaga.nivelAutoridadeResponsabilidade;
        this.habilidadesNecessarias = vaga.habilidadesNecessarias;
        this.requisitosBasicos = vaga.requisitosBasicos;
        this.requisitosDesejaveis = vaga.requisitosDesejaveis;
        this.escolaridade = vaga.escolaridade;
        this.cursosObrigatorios = vaga.cursosObrigatorios;
        this.tipoContrato = vaga.tipoContrato;
        this.cargaHorariaSemanal = vaga.cargaHorariaSemanal;
        this.remuneracao = vaga.remuneracao;
        this.informaComissoesBonus = vaga.informaComissoesBonus;
        this.comissoesBonus = vaga.comissoesBonus;
        this.valeAlimentacao = vaga.valeAlimentacao;
        this.valeTransporte = vaga.valeTransporte;
        this.valeRefeicao = vaga.valeRefeicao;
        this.trabalhaSegunda = vaga.trabalhaSegunda;
        this.segundaFeiraInicio = vaga.segundaFeiraInicio;
        this.segundaFeiraFim = vaga.segundaFeiraFim;
        this.contraturnoSegundaInicio = vaga.contraturnoSegundaInicio;
        this.contraturnoSegundaFim = vaga.contraturnoSegundaFim;
        this.trabalhaTerca = vaga.trabalhaTerca;
        this.tercaFeiraInicio = vaga.tercaFeiraInicio;
        this.tercaFeiraFim = vaga.tercaFeiraFim;
        this.contraturnoTercaInicio = vaga.contraturnoTercaInicio;
        this.contraturnoTercaFim = vaga.contraturnoTercaFim;
        this.trabalhaQuarta = vaga.trabalhaQuarta;
        this.quartaFeiraInicio = vaga.quartaFeiraInicio;
        this.quartaFeiraFim = vaga.quartaFeiraFim;
        this.contraturnoQuartaInicio = vaga.contraturnoQuartaInicio;
        this.contraturnoQuartaFim = vaga.contraturnoQuartaFim;
        this.trabalhaQuinta = vaga.trabalhaQuinta;
        this.quintaFeiraInicio = vaga.quintaFeiraInicio;
        this.quintaFeiraFim = vaga.quintaFeiraFim;
        this.contraturnoQuintaInicio = vaga.contraturnoQuintaInicio;
        this.contraturnoQuintaFim = vaga.contraturnoQuintaFim;
        this.trabalhaSexta = vaga.trabalhaSexta;
        this.sextaFeiraInicio = vaga.sextaFeiraInicio;
        this.sextaFeiraFim = vaga.sextaFeiraFim;
        this.contraturnoSextaInicio = vaga.contraturnoSextaInicio;
        this.contraturnoSextaFim = vaga.contraturnoSextaFim;
        this.trabalhaSabado = vaga.trabalhaSabado;
        this.sabadoInicio = vaga.sabadoInicio;
        this.sabadoFim = vaga.sabadoFim;
        this.contraturnoSabadoInicio = vaga.contraturnoSabadoInicio;
        this.contraturnoSabadoFim = vaga.contraturnoSabadoFim;
        this.trabalhaDomingo = vaga.trabalhaDomingo;
        this.domingoInicio = vaga.domingoInicio;
        this.domingoFim = vaga.domingoFim;
        this.contraturnoDomingoInicio = vaga.contraturnoDomingoInicio;
        this.contraturnoDomingoFim = vaga.contraturnoDomingoFim;
        this.informacoesRock = vaga.informacoesRock;
        this.genero = vaga.genero;
        this.dataInclusao = new Date(vaga.dataInclusao);
        this.sequencialEmpresa = vaga.sequencialEmpresa;
    }

    get dataInclusaoFormatado(): string {
        return DateUtils.formatDateTime(this.dataInclusao);
    }

    get dataLimiteSelecaoFormatado(): string {
        return DateUtils.formatDate(this.dataLimiteSelecao);
    }

    get dataLimiteIntegracaoFormatado(): string {
        return DateUtils.formatDate(this.dataLimiteIntegracao);
    }

    get generoFormatado(): string {
        return Genero[this.genero];
    }

    get situacaoFormatado(): string {
        return Situacao[this.situacao];
    }

    get escolaridadeFormatado(): string {
        return Escolaridade[this.escolaridade];
    }

    get tipoContratoFormatado(): string {
        return TipoContrato[this.tipoContrato];
    }

    get segundaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.segundaFeiraInicio);
    }

    get segundaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.segundaFeiraFim);
    }

    get contraTurnoSegundaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.contraturnoSegundaInicio);
    }

    get contraTurnoSegundaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.contraturnoSegundaFim);
    }

    get tercaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.tercaFeiraInicio);
    }

    get tercaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.tercaFeiraFim);
    }

    get contraTurnoTercaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.contraturnoTercaInicio);
    }

    get contraTurnoTercaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.contraturnoTercaFim);
    }

    get quartaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.quartaFeiraInicio);
    }

    get quartaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.quartaFeiraFim);
    }

    get contraTurnoQuartaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.contraturnoQuartaInicio);
    }

    get contraTurnoQuartaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.contraturnoQuartaFim);
    }

    get quintaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.quintaFeiraInicio);
    }

    get quintaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.quintaFeiraFim);
    }

    get contraTurnoQuintaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.contraturnoQuintaInicio);
    }

    get contraTurnoQuintaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.contraturnoQuintaFim);
    }

    get sextaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.sextaFeiraInicio);
    }

    get sextaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.sextaFeiraFim);
    }

    get contraTurnoSextaFeiraInicioFormatado(): string {
        return DateUtils.formatTime(this.contraturnoSextaInicio);
    }

    get contraTurnoSextaFeiraFimFormatado(): string {
        return DateUtils.formatTime(this.contraturnoSextaFim);
    }

    get sabadoInicioFormatado(): string {
        return DateUtils.formatTime(this.sabadoInicio);
    }

    get sabadoFimFormatado(): string {
        return DateUtils.formatTime(this.sabadoFim);
    }

    get contraTurnoSabadoInicioFormatado(): string {
        return DateUtils.formatTime(this.contraturnoSabadoInicio);
    }

    get contraTurnoSabadoFimFormatado(): string {
        return DateUtils.formatTime(this.contraturnoSabadoFim);
    }

    get domingoInicioFormatado(): string {
        return DateUtils.formatTime(this.domingoInicio);
    }

    get domingoFimFormatado(): string {
        return DateUtils.formatTime(this.domingoFim);
    }

    get contraTurnoDomingoInicioFormatado(): string {
        return DateUtils.formatTime(this.contraturnoDomingoInicio);
    }

    get contraTurnoDomingoFimFormatado(): string {
        return DateUtils.formatTime(this.contraturnoDomingoFim);
    }
}