import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private avaliacoes: any[] = []; // Armazena todas as avaliações

  setAvaliacoes(avaliacao: any): void {
    console.log('avaliacao:'+avaliacao);
    this.avaliacoes.push(avaliacao); // Adiciona nova avaliação
  }

  getAvaliacoes(): any[] {
    console.log('avaliacoes:'+this.avaliacoes);
    return this.avaliacoes; // Retorna todas as avaliações
  }
}
