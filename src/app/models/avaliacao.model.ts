import { Avaliador } from "./avaliador.model";
import { Questionario } from "./questionario.model";
import { Respostas } from "./respostas.model";

export class Avaliacao {
    id!: number | null;
    dataAvaliacao!: Date;
    comentario!: string;
    toxicidade!: number;
    visibiliadade!: boolean;
    questionario!: Questionario;
    respostas!: Respostas[];
    expanded?: boolean;
    mediaEstrelas?: number;
    nivelToxicidade?: string;
    avaliador!: Avaliador;
    
}
