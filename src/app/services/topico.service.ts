import { Injectable } from '@angular/core';
import { Topicos } from '../models/topicos.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicoService {

  private baseUrl = 'http://localhost:8080/subcategorias'

  constructor(private httpClient: HttpClient) { }
  
  findAll(page?: number, pageSize?: number): Observable<Topicos[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Topicos[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Topicos>{
    return this.httpClient.get<Topicos>(`${this.baseUrl}/${id}`);
  }

  insert(topico: Topicos): Observable<Topicos>{
    
    return this.httpClient.post<Topicos>(this.baseUrl, topico);
  }

  update(topico: Topicos): Observable<Topicos>{
    return this.httpClient.put<Topicos>(`${this.baseUrl}/${topico.id}`, topico);
  }

  delete(id: number): Observable<any>{
    return this.httpClient.delete<Topicos>(`${this.baseUrl}/${id}`);
  }
}
