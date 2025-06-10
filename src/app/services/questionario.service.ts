import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Questionario } from '../models/questionario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionarioService {

  private baseUrl = 'http://localhost:8080/questionarios'

  constructor(private httpClient: HttpClient) { }
  
  findAll(page?: number, pageSize?: number): Observable<Questionario[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Questionario[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Questionario>{
    return this.httpClient.get<Questionario>(`${this.baseUrl}/${id}`);
  }

  insert(questionario: Questionario): Observable<Questionario>{
    const data = {
      titulo: questionario.titulo,
      descricao: questionario.descricao,
      topicos: questionario.topicos,
      status: questionario.status,
      dataCriacao: questionario.dataCriacao,
      idSubcategoria: questionario.subcategoria.id
    };
    
    return this.httpClient.post<Questionario>(this.baseUrl, data);
  }

  update(questionario: Questionario): Observable<Questionario>{
    const data = {
      titulo: questionario.titulo,
      descricao: questionario.descricao,
      topicos: questionario.topicos,
      status: questionario.status,
      dataCriacao: questionario.dataCriacao,
      idSubcategoria: questionario.subcategoria.id
    };
    console.log(data);
    return this.httpClient.put<Questionario>(`${this.baseUrl}/${questionario.id}`, data);
  }

  delete(questionario: Questionario): Observable<any>{
    return this.httpClient.delete<Questionario>(`${this.baseUrl}/${questionario.id}`);
  }
}
