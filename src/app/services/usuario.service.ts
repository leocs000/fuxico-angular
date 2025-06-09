import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private UsuarioUrl = 'http://localhost:8080/usuariologado/usuariologado';
  private cadastroUsuUrl = 'http://localhost:8080/cadastro';

  constructor(private httpClient: HttpClient) { }
  
  create(usuario: any): Observable<Usuario> { 
    return this.httpClient.post<Usuario>(this.cadastroUsuUrl, usuario);
  }

  alterarSenha(senha: string): Observable<string>{
    return this.httpClient.post<string>(`${this.UsuarioUrl}/alterarsenha`, senha);
  }
  alterarlogin(login: string): Observable<string>{
    return this.httpClient.post<string>(`${this.UsuarioUrl}/alterarlogin`, login);
  }

}
