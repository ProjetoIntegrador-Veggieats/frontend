import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.css']
})

export class UsuarioEditComponent implements OnInit {

  // Variáveis
  usuario: Usuario = new Usuario();
  tipoDeUsuario: string;
  confirmarSenha: string;

  idUsuario = environment.id

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router:Router,
    private alertas: AlertasService,
  ) { }


  ngOnInit(){
    window.scroll(0,0)

    if(environment.token == ""){
      this.alertas.showAlertDanger("Sua sessão expirou! Faça o login novamente.")
      this.router.navigate(["/login"])
    }

  //Token e rota id usuário
    this.auth.refreshToken()
    let idUsuario = this.route.snapshot.params['id']
    this.findByIdUsuario(idUsuario)
  }

  // Usuário
    tipoDeUser(event: any){
      this.tipoDeUsuario = event.target.value
    }

    // Senha
    confirmSenha(event: any){
      this.confirmarSenha = event.target.value
    }

    // Pegar o id do usuário
    findByIdUsuario(id: number){
      this.auth.getByIdUsuario(id).subscribe((resp: Usuario)=>{
        this.usuario = resp
        this.usuario.senha = ''
      })
    }
  // Atualizar o cadastro do usuário
  atualizar(){
    this.usuario.tipoUsuario = this.usuario.tipoUsuario
    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger("As senhas não coincidem, tente novamente.")
    } else {
      this.auth.atualizar(this.usuario).subscribe((resp: Usuario)=> {
        this.usuario = resp
        this.alertas.showAlertSuccess("Usuário atualizado com sucesso! Faça o login novamente.")
        environment.token=''
        environment.foto=''
        environment.usuario=''
        environment.nome=''
        environment.id = 0
        this.router.navigate(["/login"])
      })
    }
  }

  findByIdUser(){
    this.auth.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) =>{
      this.usuario= resp
    })

}
}
