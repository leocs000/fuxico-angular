import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/auth';
  
    private tokenKey = 'jwt_token';
    private usuarioLogadoKey = 'usuario_logado';
    private usuarioLogadoSubject = new BehaviorSubject<Usuario|null>(null);

    constructor(private httpClient: HttpClient,
                private localStorageService: LocalStorageService,
                private jwtHelper: JwtHelperService
    ) {
        this.initUsuarioLogado();
    }

    private initUsuarioLogado(): void {
      const usuario = this.localStorageService.getItem(this.usuarioLogadoKey);
      console.log('Usuario do localStorage:', usuario);
      if (usuario) {
        const usuarioLogado = JSON.parse(usuario);
        console.log('Usuario logado após parse:', usuarioLogado);
        this.usuarioLogadoSubject.next(usuarioLogado);
      }
    }
    

    public loginADM(username: string, senha: string): Observable<any> {
      const params = {
          login: username,
          senha: senha,
          perfil: 3 // ADM
      }

      //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.httpClient.post(`${this.baseUrl}`, params, {observe: 'response'}).pipe(
        tap((res: any) => {
          const authToken = res.headers.get('Authorization') ?? '';
          console.log(authToken);
          if (authToken) {
            this.setToken(authToken);
            const usuarioLogado = res.body;
            if (usuarioLogado) {
              this.setUsuarioLogado(usuarioLogado);
              this.usuarioLogadoSubject.next(usuarioLogado);
            }
          }
        })
      );
    }

    public loginFuncionario(username: string, senha: string): Observable<any> {
      const params = {
          login: username,
          senha: senha,
          perfil: 2 // funcionario
      }

      //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.httpClient.post(`${this.baseUrl}`, params, {observe: 'response'}).pipe(
        tap((res: any) => {
          const authToken = res.headers.get('Authorization') ?? '';
          console.log(authToken);
          if (authToken) {
            this.setToken(authToken);
            const usuarioLogado = res.body;
            if (usuarioLogado) {
              this.setUsuarioLogado(usuarioLogado);
              this.usuarioLogadoSubject.next(usuarioLogado);
            }
          }
        })
      );
    }

    public loginAvaliador(username: string, senha: string): Observable<any> {
      const params = {
          login: username,
          senha: senha,
          perfil: 1 // avaliador
      }

      console.log('--------------------')
      console.log(params.login);

      //{ observe: 'response' } para garantir que a resposta completa seja retornada (incluindo o cabeçalho)
    return this.httpClient.post(`${this.baseUrl}`, params, {observe: 'response'}).pipe(
        tap((res: any) => {
          const authToken = res.headers.get('Authorization') ?? '';
          console.log(authToken);
          if (authToken) {
            this.setToken(authToken);
            const usuarioLogado = res.body;
            if (usuarioLogado) {
              this.setUsuarioLogado(usuarioLogado);
              this.usuarioLogadoSubject.next(usuarioLogado);
            }
          }
        })
      );
    }
  
    setUsuarioLogado(usuario: Usuario): void {
      console.log('Setando usuario logado:', usuario);
      this.localStorageService.setItem(this.usuarioLogadoKey, JSON.stringify(usuario));
    }    

    setToken(token: string): void {
        this.localStorageService.setItem(this.tokenKey, token);
    }

    getUsuarioLogado(): Observable<Usuario | null> {
      return this.usuarioLogadoSubject.asObservable();
    }
    

    getToken(): string | null {
        return this.localStorageService.getItem(this.tokenKey);
    }

    removeToken(): void {
        this.localStorageService.removeItem(this.tokenKey);
    }

    removeUsuarioLogado() :void {
        this.localStorageService.removeItem(this.usuarioLogadoKey);
        this.usuarioLogadoSubject.next(null);
    }

    isTokenExpired(): boolean {
        const token = this.getToken();
        if (!token) {
            return true;
        }
        try {
            const isExpired = this.jwtHelper.isTokenExpired(token);
            if(isExpired){
                this.removeToken();
            }
            return isExpired;
        } catch (error) {
            console.error('Token invalido', error);
            return true;
        }
    }
}
