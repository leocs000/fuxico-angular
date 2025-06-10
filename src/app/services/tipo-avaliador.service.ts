import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoAvaliador } from '../models/tipo-avaliador.model';

@Injectable({
  providedIn: 'root'
})
export class TipoAvaliadorService {

  private baseUrl = 'http://localhost:8080/tipoavaliador'

  constructor(private httpClient: HttpClient) { }

  findAll(page?: number, pageSize?: number): Observable<TipoAvaliador[]>{

    let params = {};

    if (page !== undefined && pageSize !== undefined) {
      params = {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    }

    return this.httpClient.get<TipoAvaliador[]>(this.baseUrl, {params});
  }

  count(): Observable<number>{
    return this.httpClient.get<number>(`${this.baseUrl}/count`);
  }

  findById(id: string): Observable<TipoAvaliador>{
    return this.httpClient.get<TipoAvaliador>(`${this.baseUrl}/${id}`);
  }

  insert(tipoAvaliador: TipoAvaliador): Observable<TipoAvaliador>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma..id
    };
*/    
    return this.httpClient.post<TipoAvaliador>(this.baseUrl, tipoAvaliador);
  }

  update(tipoAvaliador: TipoAvaliador): Observable<TipoAvaliador>{
/*    const data = {
      nome: arma.nome,
      idEstado: arma.estado.id
    };
*/
    return this.httpClient.put<TipoAvaliador>(`${this.baseUrl}/${tipoAvaliador.id}`, tipoAvaliador);
  }

  delete(tipoAvaliador: TipoAvaliador): Observable<any>{
    return this.httpClient.delete<TipoAvaliador>(`${this.baseUrl}/${tipoAvaliador.id}`);
  }
}
