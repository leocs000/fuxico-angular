import { Usuario } from "./usuario.model";

export class Avaliador {
    id!: number;
    nome!: string;
    cpf!: string;
    email!: string;
    dataNascimento!: string;
    serieAtual!: string;
    usuario!: Usuario;
}
