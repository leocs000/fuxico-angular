import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Avaliador } from '../models/avaliador.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvaliadorService {

  private baseUrl = 'http://localhost:8080/avaliadores';

  constructor(private httpClient: HttpClient) {
  }

  findAll(page?: number, pageSize?: number): Observable<Avaliador[]> {
    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Avaliador[]>(this.baseUrl, {params}); 
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findDadosPessoais(): Observable<Avaliador>{
    return this.httpClient.get<Avaliador>(`${this.baseUrl}/dados-pessoais`);
  }

  findById(id: string): Observable<Avaliador> {
    return this.httpClient.get<Avaliador>(`${this.baseUrl}/${id}`); 
  }

  insert(avaliador: Avaliador): Observable<Avaliador> {
    return this.httpClient.post<Avaliador>(this.baseUrl, avaliador);
  }

  update(avaliador: Avaliador): Observable<Avaliador> {
    return this.httpClient.put<any>(`${this.baseUrl}/${avaliador.id}`, avaliador); 
  }

  delete(avaliador: Avaliador): Observable<any>{
    return this.httpClient.delete<any>(`${this.baseUrl}/${avaliador.id}`); 
  }
}
