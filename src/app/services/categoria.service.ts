import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private baseUrl = 'http://localhost:8080/categorias'

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<Categoria[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<Categoria[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<Categoria>{
    return this.httpClient.get<Categoria>(`${this.baseUrl}/${id}`);
  }

  insert(categoria: Categoria): Observable<Categoria>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma..id
    };
*/    
    return this.httpClient.post<Categoria>(this.baseUrl, categoria);
  }

  update(categoria: Categoria): Observable<Categoria>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma.estado.id
    };
*/
    return this.httpClient.put<Categoria>(`${this.baseUrl}/${categoria.id}`, categoria);
  }

  delete(categoria: Categoria): Observable<any>{
    return this.httpClient.delete<Categoria>(`${this.baseUrl}/${categoria.id}`);
  }
}
