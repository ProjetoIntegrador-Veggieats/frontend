import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Usuario } from '../model/Usuario';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {



  usuario: Usuario = new Usuario()
  nome: string = environment.nome
  foto = environment.foto
  idUser: number = environment.id
  login: boolean = true
  id = environment.id

  constructor(
    private router:Router,
    public auth: AuthService
    ) { }

  ngOnInit() {
    this.auth.refreshToken()

  }


  sair(){
    this.router.navigate(['/inicio'])
    environment.token = ''
    environment.foto = ''
    environment.nome = ''
    environment.usuario = ''
    environment.id = 0
}

}
