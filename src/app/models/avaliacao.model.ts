import { Questionario } from "./questionario.model";
import { Respostas } from "./respostas.model";

export class Avaliacao {
    id!: number;
    comentario!: string;
    toxicidade!: number;
    visibiliadade!: true;
    questionario!: Questionario;
    resposta!: Respostas;
}
