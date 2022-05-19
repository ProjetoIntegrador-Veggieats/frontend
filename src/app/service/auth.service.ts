import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router:Router
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
    return this.http.post<UsuarioLogin>('https://veggieats.herokuapp.com/usuario/logar', usuarioLogin)
  }

  atualizar(usuario:Usuario): Observable<Usuario>{
    return this.http.put<Usuario>('https://veggieats.herokuapp.com/usuario/atualizar',usuario, this.token)
  }

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`https://veggieats.herokuapp.com/usuario/${id}`)

  }
  cadastrar(usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>('https://veggieats.herokuapp.com/usuario/cadastrar',usuario)
  }

  getAllUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>('https://veggieats.herokuapp.com/usuario/all')
    }

    logado(){
      let ok: boolean = false
      if(environment.token != ''){
        ok=true
      }
      return ok
    }
    userId() {
      let id: number = 0
      if (environment.id != 0){
        id = environment.id
      }
      return id
    }
    vendedor(){
      let ok: boolean = false;
      if(environment.tipo === 'vendedor'){
          ok = true
      }
    return ok
  }

  adm(){
    let ok: boolean = false;
    if(environment.tipo === 'adm'){
        ok = true
    }
  return ok
}

  produto(){
    let ok: boolean = false;
    if(environment.tipo === 'produto'){
        ok = true
    }
  return ok
}
  }

