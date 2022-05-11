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
    return this.http.post<UsuarioLogin>('https://projeto-veggieats.herokuapp.com/usuario/logar', usuarioLogin)
  }

  atualizar(Usuario:Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('http://localhost:8080/usuarios/atualizar',Usuario, this.token)
  }

  getByIdUser(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`http://localhost:8080/usuarios/${id}`, this.token)

  }
  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('https://projeto-veggieats.herokuapp.com/usuario/cadastrar', usuario)
  }
  logado(){
    let ok: boolean = false

    if(environment.token != ""){
      ok=true
    }

    return ok
  }
}
