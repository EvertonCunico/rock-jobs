import { Modelo } from '@boom/modelos/modelo';
import { Cliente } from './cliente';
import { RolesUser } from './roles';

export class Usuario extends Modelo {
    nome: string;
    sobrenome: string;
    cpf?: string;
    url?: string;
    endereco?: string;
    dataNascimento?: Date;
    email?: string;
    telefoneCelular?: string;
    senha?: string;
    ativo?: boolean;
    tipoAcesso?: RolesUser;
    cliente?: Cliente;
}