import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-entrar-cadastro',
  templateUrl: './entrar-cadastro.component.html',
  styleUrls: ['./entrar-cadastro.component.css']
})
export class EntrarCadastroComponent implements OnInit {

  usuario: Usuario= new Usuario
  confirmarSenha: string
  tipoUsuario: string
  usuarioLogin: UsuarioLogin= new UsuarioLogin

  constructor(private authService: AuthService,
              private router: Router,
              private alertas: AlertasService) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event:any){
    this.confirmarSenha=event.target.value
  }

  tipoUser(event:any){
    this.tipoUsuario=event.target.value
  }

  cadastrar(){
      this.usuario.tipoUsuario=this.tipoUsuario

      if(this.usuario.senha != this.confirmarSenha){
      alert("As senhas estão incorretas")
      }else{
        this.authService.cadastrar(this.usuario).subscribe((resp: Usuario)=> {this.usuario=resp
        this.router.navigate(["/login"])
        this.alertas.showAlertSuccess("Usuario cadastrado com sucesso! Efetue o Login para autenticar sua conta.")
      }

        )
      }
  }
  entrar(){
    this.authService.logar(this.usuarioLogin).subscribe({next:(resp: UsuarioLogin)=>{this.usuarioLogin=resp
      environment.token=this.usuarioLogin.token
      environment.nome=this.usuarioLogin.nome
      environment.foto=this.usuarioLogin.foto
      environment.id=this.usuarioLogin.id
      environment.tipo=this.usuarioLogin.tipoUsuario

      this.router.navigate(['/inicio'], { queryParams: { user: environment.id } })},
      error: erro=> {
      if (erro.status==401) {
        this.alertas.showAlertDanger("Usuário e/ou senha incorretos")
      }
    }})
}
}
