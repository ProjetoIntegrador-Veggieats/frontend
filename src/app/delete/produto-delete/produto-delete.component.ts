import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
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


  ) { }

  ngOnInit() {

    window.scroll(0,0)
    if(environment.token==''){
      alert("Sua sessão expirou")
      this.router.navigate(['/entrar'])
    }
    this.idPost=this.route.snapshot.params['id']
    this.findByIdproduto(this.idPost)

  }

  findByIdproduto(id:number){
    this.produtoService.getByIdProduto(id).subscribe((resp:Produto)=>{
      this.produto=resp
    })
  }

  apagar(){
    this.produtoService.deleteProduto(this.idPost).subscribe(()=>{
      alert('produto apagada')
    this.router.navigate(['/inicio'])}
    )
  }}


