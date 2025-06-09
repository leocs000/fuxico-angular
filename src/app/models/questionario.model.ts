import { Subcategoria } from "./subcategoria.model";
import { Topicos } from "./topicos.model";

export class Questionario {
    id!: number;
    titulo!: string;
    descricao!: string;
    topicos!: Topicos[];
    status!: boolean;
    dataCriacao!: Date;
    subcategoria!: Subcategoria;
}
