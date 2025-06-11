import { Injectable } from '@angular/core';
import { Avaliacao } from '../models/avaliacao.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  private avaliacoes: any[] = []; // Armazena todas as avaliações

  private baseUrl = 'http://localhost:8080/avaliacoes'
  
    constructor(private httpClient: HttpClient) { }
    
    findAll(page?: number, pageSize?: number): Observable<Avaliacao[]>{
  
      let params = {};
  
      if (page !== undefined && pageSize !== undefined) {
        params = {
          page: page.toString(),
          pageSize: pageSize.toString()
        }
      }
      return this.httpClient.get<Avaliacao[]>(this.baseUrl, {params});
    }
  
    count(): Observable<number>{
      return this.httpClient.get<number>(`${this.baseUrl}/count`);
    }
  
    findById(id: string): Observable<Avaliacao>{
      return this.httpClient.get<Avaliacao>(`${this.baseUrl}/${id}`);
    }
  
    insert(avaliacao: Avaliacao): Observable<Avaliacao>{
      const data = {
        dataAvaliacao: avaliacao.dataAvaliacao,
        comentario: avaliacao.comentario,
        toxicidade: avaliacao.toxicidade,
        visibiliadade: avaliacao.visibiliadade,
        idQuestionario: avaliacao.questionario.id,
        respostas: avaliacao.respostas.map(resposta => ({
          idTopico: resposta.topico.id,
          estrela: resposta.estrela
        })) 
      };
      
      return this.httpClient.post<Avaliacao>(this.baseUrl, data);
    }
  
    update(avaliacao: Avaliacao): Observable<Avaliacao>{
      const data = {
        dataAvaliacao: avaliacao.dataAvaliacao,
        comentario: avaliacao.comentario,
        toxicidade: avaliacao.toxicidade,
        visibiliadade: avaliacao.visibiliadade,
        idQuestionario: avaliacao.questionario.id,
        respostas: avaliacao.respostas.map(resposta => ({
          id: resposta.id,
          idAvaliacao: resposta.avaliacao.id,
          idTopico: resposta.topico.id,
          estrela: resposta.estrela
        })) 
      };
      console.log(data);
      return this.httpClient.put<Avaliacao>(`${this.baseUrl}/${avaliacao.id}`, data);
    }
  
    delete(avaliacao: Avaliacao): Observable<any>{
      return this.httpClient.delete<Avaliacao>(`${this.baseUrl}/${avaliacao.id}`);
    }

    minhasAvaliacoes(page?: number, pageSize?: number): Observable<Avaliacao[]>{
      let params = {};
  
      if (page !== undefined && pageSize !== undefined) {
        params = {
          page: page.toString(),
          pageSize: pageSize.toString()
        }
      }
  
      return this.httpClient.get<Avaliacao[]>(`${this.baseUrl}/minhasAvaliacoes`, {params});
    }
  setAvaliacoes(avaliacao: any): void {
    console.log('avaliacao:'+avaliacao);
    this.avaliacoes.push(avaliacao); // Adiciona nova avaliação
  }

  getAvaliacoes(): any[] {
    console.log('avaliacoes:'+this.avaliacoes);
    return this.avaliacoes; // Retorna todas as avaliações
  }
  


}
