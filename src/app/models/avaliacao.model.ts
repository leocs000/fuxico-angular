import { Questionario } from "./questionario.model";
import { Respostas } from "./respostas.model";

export class Avaliacao {
    id!: number;
    dataAvaliacao!: Date;
    comentario!: string;
    toxicidade!: number;
    visibiliadade!: boolean;
    questionario!: Questionario;
    respostas!: Respostas[];
    
}
