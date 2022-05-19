import { Categoria } from 'src/app/model/Categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/service/categoria.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from 'src/app/service/alertas.service';

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
    private route:ActivatedRoute,
    private alertas: AlertasService,
  ) { }

  ngOnInit() {

    window.scroll(0,0)
    if(environment.token==''){
      this.alertas.showAlertDanger("Sua sessão expirou! Por favor, faça o login novamente.")
      this.router.navigate(['/login'])
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
  this.alertas.showAlertSuccess('Categoria atualizada com sucesso')
  this.router.navigate(['/inicio'])}
  )
}
}
