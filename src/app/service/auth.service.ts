import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token={
    headers: new HttpHeaders().set('Authorization', environment.token),
  };
  refreshToken(){
    this.token={
      headers:new HttpHeaders().set("Authorization", environment.token),
    };
  }

  logar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>('http://localhost:8080/usuario/logar', usuarioLogin)
  }

  atualizar(usuario:Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('http://localhost:8080/usuario/atualizar',usuario, this.token)
  }

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`http://localhost:8080/usuario/${id}`, this.token)

  }
  cadastrar(usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('http://localhost:8080/usuario/cadastrar',usuario)
  }

  getAllUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>('http://localhost:8080/usuario/all', this.token)

    }

    logado(){
      let ok: boolean = false
      if(environment.token != ''){
        ok=true
      }
      return ok
    }

}
