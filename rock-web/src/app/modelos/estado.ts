import { Modelo } from '@boom/modelos/modelo';

export interface Estado extends Modelo {
  id?: number;
  nome: string;
  pais: string;
}
