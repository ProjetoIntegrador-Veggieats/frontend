import { environment } from 'src/environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';
import { Usuario } from '../model/Usuario';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';
import { AuthService } from '../service/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

    produto: Produto = new Produto ()
    listaCategorias:Categoria[]
    listaProdutos:Produto[]
    idCategoria:number
    categoria:Categoria=new Categoria()
    user:Usuario=new Usuario()
    idUser:any;
    userLog:any;

  constructor(
    private router:Router,
    private categoriaService:CategoriaService,
    private produtoService:ProdutoService,
    public auth: AuthService,
    private route: ActivatedRoute,
    private alertas: AlertasService,
    ) { }

    ngOnInit() {

    window.scroll(0,0)

    this.auth.refreshToken()
    this.getAllCategorias()
    this.getAllProdutos()

  }

  getAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategorias=resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp:Categoria)=>{
      this.categoria=resp
    })
  }
  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp:Produto[])=>{
      this.listaProdutos=resp
    })
  }
  findByIdUser(){
    this.auth.getByIdUsuario(this.idUser).subscribe((resp:Usuario)=>{
      this.user=resp
    })
  }

  enviar(){
    this.alertas.showAlertInfo('Seu e-mail já foi enviado para análise. Aguarde para mais informações')
  }



}
