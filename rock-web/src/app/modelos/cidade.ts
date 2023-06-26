import { Modelo } from '@boom/modelos/modelo';
import { Estado } from './estado';

export interface Cidade extends Modelo {
  id?: number;
  nome: string;
  estado: Estado;
}
