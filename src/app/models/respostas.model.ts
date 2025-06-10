import { Avaliacao } from "./avaliacao.model";
import { Topicos } from "./topicos.model";

export class Respostas {
    id!: number;
    avaliacao!: Avaliacao;
    topico!: Topicos;
    estrela!: number;
}
