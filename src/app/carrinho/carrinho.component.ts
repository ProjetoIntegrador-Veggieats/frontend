import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from '../model/Produto';
import { AuthService } from '../service/auth.service';
import { CarrinhoService } from '../service/carrinho.service';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  produtos: Produto[] = []
  listaCompras = this.carrinho.listar()
  comprados = this.carrinho.listar();

  constructor(
    private carrinho: CarrinhoService,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {

    window.scroll(0,0)
  }

  total() {
    return this.comprados.map((item) => item.preco).reduce((a, b) => a + b, 0);
  }

  enviar(){
    alert('Enviamos seu pedido ao restaurante!!!')
      this.router.navigate(["/inicio"])
  }

}