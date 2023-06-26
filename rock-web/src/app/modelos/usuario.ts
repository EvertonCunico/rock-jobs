import { Modelo } from '@boom/modelos/modelo';
import { RolesUser } from './roles';
import { Cliente } from './cliente';

export class Usuario extends Modelo {
    nome: string;
    sobrenome: string;
    cpf?: string;
    endereco?: string;
    dataNascimento?: Date;
    email?: string;
    telefoneCelular?: string;
    senha?: string;
    ativo?: boolean;
    tipoAcesso?: RolesUser;
    cliente?: Cliente;
}