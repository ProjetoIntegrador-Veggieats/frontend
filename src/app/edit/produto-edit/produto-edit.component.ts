import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-edit',
  templateUrl: './produto-edit.component.html',
  styleUrls: ['./produto-edit.component.css']
})
export class ProdutoEditComponent implements OnInit {

  produto: Produto = new Produto()
  categoria: Categoria=new Categoria()
  listaCategoria: Categoria[]
  idCategoria:number

  constructor(
    private router: Router,
    private produtoService:ProdutoService,
    private route: ActivatedRoute,
    private categoriaService: CategoriaService

  ) { }

  ngOnInit() {

    window.scroll(0,0)
    if(environment.token==''){
      alert("Sua sessão expirou")
      this.router.navigate(['/entrar'])
    }
    let id=this.route.snapshot.params['id']
    this.findByIdProduto(id)
    this.findAllCategorias()

    this.produtoService.refreshToken()
    
  }

  

  findByIdProduto(id:number){
    this.produtoService.getByIdProdutos(id).subscribe((resp:Produto)=>{
      this.produto = resp
    })
  }

  findByIdCategoria(){
    this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp:Categoria)=>{
      this.categoria=resp
    })
  }

  findAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
      this.listaCategoria = resp
    })
  }

  atualizar(){
    this.categoria.id=this.idCategoria
    this.produto.categoria = this.categoria

    this.produtoService.putProduto(this.produto).subscribe((resp:Produto)=>{
      this.produto=resp
      alert('Produto atualizado')
      this.router.navigate(['/restaurante'])
    })
  }

}
