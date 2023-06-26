import { Modelo } from '@boom/modelos/modelo';

export interface Pais extends Modelo {
  id?: number;
  nome: string;
  nomePt: string;
  sigla: string;
  bacen: number;
}
