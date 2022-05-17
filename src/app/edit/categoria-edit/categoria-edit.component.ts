import { Categoria } from 'src/app/model/Categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-categoria-edit',
  templateUrl: './categoria-edit.component.html',
  styleUrls: ['./categoria-edit.component.css']
})
export class CategoriaEditComponent implements OnInit {

  categoria:Categoria= new Categoria()

  constructor(
    private categoriaService:CategoriaService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit() {

    window.scroll(0,0)
    if(environment.token==''){
      alert("Sua sessão expirou, por favor façao o login novamente!")
      this.router.navigate(['/entrar'])
  }

  this.categoriaService.refreshToken()
    let id=this.route.snapshot.params['id']
    this.findByIdCategoria(id)
  }
findByIdCategoria(id:number){
  this.categoriaService.getByIdCategoria(id).subscribe((resp:Categoria)=>{this.categoria=resp})

}
atualizar(){
  this.categoria.produto = []
  this.categoriaService.putCategoria(this.categoria).subscribe((resp:Categoria)=>{this.categoria=resp
  alert('Categoria atualizada')
  this.router.navigate(['/inicio'])}
  )
}
}
