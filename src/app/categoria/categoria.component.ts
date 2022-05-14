import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Categoria } from '../model/Categoria';
import { CategoriaService } from '../service/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  categoria: Categoria= new Categoria()
  listaCategorias:Categoria[]

constructor(
  private router:Router,
  private categoriaService: CategoriaService
) { }

ngOnInit() {
  
  window.scroll(0,0)

  if(environment.token==''){
    alert("Sua sessão expirou")
  this.router.navigate(['/login'])
  }
  this.categoriaService.refreshToken()
  this.findAllCategorias()
}

findAllCategorias(){
this.categoriaService.getAllCategoria().subscribe((resp:Categoria[])=>{
  this.listaCategorias=resp
})
}

cadastrar(){
  console.log(this.categoria)
  this.categoriaService.postCategoria(this.categoria).subscribe((resp:Categoria)=>{ 
  this.categoria=resp 
  alert('Categoria cadastrada com sucesso')
  this.findAllCategorias()
    this.categoria=new Categoria()
    this.findAllCategorias()
  })
}

}