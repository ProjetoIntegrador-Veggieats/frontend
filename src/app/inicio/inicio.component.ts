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
    private produtoService:ProdutoService,
    private categoriaService:CategoriaService,
    private authService:AuthService,
    private route: ActivatedRoute
    ) { }

    ngOnInit() {

    if(environment.token==''){
    alert("Sua sessão expirou")
      this.router.navigate(['/login'])
    }
    this.authService.refreshToken()
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
    this.authService.getByIdUsuario(this.idUser).subscribe((resp:Usuario)=>{
      this.user=resp
    })
  }
  publicar(){
    this.categoria.id=this.idCategoria
    this.produto.categoria=this.categoria
    this.user.id=this.idUser
    this.produtoService.postProduto(this.produto).subscribe((resp: Produto)=> {this.produto=resp
    alert('Produto cadastrado')
      this.produto=new Produto()
      this.getAllProdutos()
    })
  }

}
