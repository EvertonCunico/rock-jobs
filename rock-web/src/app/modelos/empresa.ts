import { Modelo } from '@boom/modelos/modelo';

export enum NumeroColaboradores {
  ATE_10 = 'Até 10',
  DE_10_A_50 = 'De 10 a 50',
  DE_50_A_200 = 'De 50 a 200',
  MAIS_DE_200 = 'Mais de 200'
}

export enum AreaDeAtuacao {
  INDUSTRIA = 'Indústria',
  COMERCIO = 'Comércio',
  PRESTACAO_DE_SERVICO = 'Prestação de Serviço'
}

export enum RamoDeAtuacao {
  FRIGORIFICO = 'Frigorífico',
  MOVELEIRO = 'Moveleiro',
  METALURGICO = 'Metalúrgico'
}

export class Empresa extends Modelo  {
  id: number;
  nomeFantasia: string;
  razaoSocial: string;
  cnpj: string;
  url?: string;
  inscricaoEstadual: string;
  telefone: string;
  email: string;
  endereco: string;
  enderecoNumero: string;
  enderecoBairro: string;
  enderecoCep: string;
  numeroColaboradores: NumeroColaboradores;
  areaDeAtuacao: AreaDeAtuacao;
  ramoDeAtuacao: RamoDeAtuacao;
  responsavelRH: string;
  telefoneResponsavelRH: string;
  responsavelEmpresa: string;
  telefoneResponsavelEmpresa: string;
 
}