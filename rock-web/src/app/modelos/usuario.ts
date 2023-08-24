import { Modelo } from '@boom/modelos/modelo';
import { Empresa } from './empresa';
import { RolesUser } from './roles';

export class Usuario extends Modelo {
    nome: string;
    sobrenome: string;
    cpf?: string;
    url?: string;
    endereco?: string;
    complemento?: string;
    dataNascimento?: Date;
    email?: string;
    telefoneCelular?: string;
    senha?: string;
    ativo?: boolean;
    tipoAcesso?: RolesUser;
    empresa?: Empresa;
    dataInclusao?: Date;
}