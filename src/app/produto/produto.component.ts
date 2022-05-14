import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  produto: Produto = new Produto ()
  listaCategorias: Categoria[]
  listaProdutos: Produto[]
  idCategoria: number
  categoria: Categoria= new Categoria()
  user: Usuario= new Usuario()
  idUser= environment.id

constructor(
  private router: Router,
  private produtoService: ProdutoService,
  private categoriaService: CategoriaService,
  private authService: AuthService
) { }

ngOnInit() {

  window.scroll(0,0);

  if(environment.token==''){
  alert("Sua sessão expirou")
    this.router.navigate(['/login'])
  }
  this.authService.refreshToken()
  this.produtoService.refreshToken()
  this.categoriaService.refreshToken()
  this.getAllCategorias()
  this.getAllProdutos()

}

getAllCategorias(){
  this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) =>{
    this.listaCategorias = resp
  })
}

findByIdCategoria(){
  this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) =>{
    this.categoria = resp
  })
}
getAllProdutos(){
  this.produtoService.getAllProdutos().subscribe((resp: Produto[] ) =>{
    this.listaProdutos = resp
  })
}
findByIdUser(){
  this.authService.getByIdUsuario(this.idUser).subscribe((resp: Usuario) =>{
    this.user = resp
  })
}
publicar(){
  this.categoria.id = this.idCategoria
  this.produto.categoria = this.categoria

  this.user.id = this.idUser
  this.produto.usuario = this.user

  this.produtoService.postProduto(this.produto).subscribe((resp: Produto) =>{
    this.produto=resp
  alert('Produto cadastrado')
    this.produto = new Produto()
    this.getAllProdutos()
  })
}

}