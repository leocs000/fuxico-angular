import { TipoAvaliador } from "./tipo-avaliador.model";
import { Usuario } from "./usuario.model";

export class Avaliador {
    id!: number;
    nome!: string;
    cpf!: string;
    email!: string;
    dataNascimento!: string;
    serieAtual!: string;
    tipoAvaliador!: TipoAvaliador;
    usuario!: Usuario;
    
}
