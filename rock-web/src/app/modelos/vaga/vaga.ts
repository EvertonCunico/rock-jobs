import { Modelo } from '@boom/modelos/modelo';
import { Cliente } from '../cliente';
import { Escolaridade } from './escolaridade';
import { TipoContrato } from './tipoContrato';
import { Situacao } from './situacao';

export class Vaga extends Modelo {
    cliente: Cliente;
    url?: string;
    nomeDaFuncao: string;
    quantidadeVagas: number;
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
    
}