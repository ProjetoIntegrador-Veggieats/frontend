import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { AlertasService } from 'src/app/service/alertas.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  produto: Produto =new Produto()
  idPost:number


  constructor(
    private router:Router,
    private produtoService:ProdutoService,
    private route: ActivatedRoute,
    private alertas: AlertasService,


  ) { }

  ngOnInit() {

    window.scroll(0,0)

    if(environment.token==''){
      this.alertas.showAlertDanger("Sua sessão expirou! Por favor, faça o login novamente.")
      this.router.navigate(['/login'])
    }
    this.idPost=this.route.snapshot.params['id']
    this.findByIdproduto(this.idPost)

    this.produtoService.refreshToken()
  }

  findByIdproduto(id:number){
    this.produtoService.getByIdProdutos(id).subscribe((resp:Produto)=>{
      this.produto=resp
    })
  }

  apagar(){
    this.produtoService.deleteProduto(this.idPost).subscribe(()=>{
      this.alertas.showAlertSuccess('Produto apagado com sucesso!')
    this.router.navigate(['/produto'])}
    )
  }}


