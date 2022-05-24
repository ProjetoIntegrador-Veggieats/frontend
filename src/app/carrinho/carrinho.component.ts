import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { AlertasService } from '../service/alertas.service';
import { CarrinhoService } from '../service/carrinho.service';

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
    private router: Router,
    private alerta: AlertasService
  ) {}

  ngOnInit() {

    window.scroll(0,0)
    if(environment.token==''){
      this.alerta.showAlertDanger("Sua sessão expirou! Por favor, faça o login novamente!")
      this.router.navigate(['/login'])
  }
  }

  total() {
    return this.comprados.map((item) => item.preco).reduce((a, b) => a + b, 0);
  }

  enviar(){
    this.carrinho.limpar()
    this.alerta.showAlertSuccess('Enviamos seu pedido ao restaurante!')
    this.router.navigate(["/inicio"])
  }

  removerAll() {
    this.carrinho.limpar()
  }



}