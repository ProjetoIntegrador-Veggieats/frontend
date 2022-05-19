import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { AuthService } from '../service/auth.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Usuario } from '../model/Usuario';
import { environment } from 'src/environments/environment.prod';
import { CarrinhoService } from '../service/carrinho.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  idUsuario = environment.id
  usuario: Usuario = new Usuario()
  produto: Produto = new Produto()
  categoria: Categoria = new Categoria()

  listaCategorias: Categoria[];
  listaProdutos: Produto[];
  listaUsuarios: Usuario[];

  listaFiltrada: any = []

  nomeProduto: string
  userSemProduto: Produto[]

  constructor(
    public authService: AuthService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private router: Router,
    private carrinho: CarrinhoService
  ) {}

  ngOnInit() {
    window.scroll(0,0);

    this.authService.refreshToken()
    this.getAllCategorias();
    this.getAllProdutos();
  }

  getAllCategorias() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategorias = resp;
    });
  }



  getAllProdutos(){
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) =>{
      this.listaProdutos = resp
    })
  }

  getAllUsuarios() {
    this.authService.getAllUsuarios().subscribe((resp: Usuario[]) => {
      this.listaUsuarios = resp;
    });
  }

  getProdById(id: number){
    this.produtoService.getByIdProdutos(id).subscribe((resp: Produto) =>{
      this.produto = resp;
      this.addProduto()
    })
  }

  addProduto(){
    this.carrinho.adicionar(this.produto)
  }

  findByIdUsuario(){
  this.authService.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) =>{
    this.usuario= resp
  })
}

  findByTituloProduto(){
    if(this.nomeProduto == ''){
      this.getAllProdutos()
    } else{
        this.produtoService.getByNomeProduto(this.nomeProduto).subscribe((resp: Produto[]) =>{
          this.listaProdutos = resp
    })
  }
}



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 500,
    autoplayHoverPause: true,
    navText: [
      '<i class="fa fa-angle-left" aria-hidden="true" ></i> P',
      '<i class="fa fa-angle-right" aria-hidden="true" ></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      760: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
    // nav: true,
  };
}