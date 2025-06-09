import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subcategoria } from '../models/subcategoria.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  private baseUrl = 'http://localhost:8080/subcategorias'

  constructor(private httpClient: HttpClient) { }
  
  findAll(page?: number, pageSize?: number): Observable<Subcategoria[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }
    return this.httpClient.get<Subcategoria[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Subcategoria>{
    return this.httpClient.get<Subcategoria>(`${this.baseUrl}/${id}`);
  }

  insert(subcategoria: Subcategoria): Observable<Subcategoria>{
    const data = {
      nome: subcategoria.nome,
      qtdNoEstoque: subcategoria.categoria.id,
    };
    
    return this.httpClient.post<Subcategoria>(this.baseUrl, data);
  }

  update(subcategoria: Subcategoria): Observable<Subcategoria>{
    const data = {
      nome: subcategoria.nome,
      qtdNoEstoque: subcategoria.categoria.id,
    };
    return this.httpClient.put<Subcategoria>(`${this.baseUrl}/${subcategoria.id}`, data);
  }

  delete(subcategoria: Subcategoria): Observable<any>{
    return this.httpClient.delete<Subcategoria>(`${this.baseUrl}/${subcategoria.id}`);
  }
}
