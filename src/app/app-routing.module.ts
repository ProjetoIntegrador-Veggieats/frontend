import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContatoComponent } from './contato/contato.component';
import { EntrarCadastroComponent } from './entrar-cadastro/entrar-cadastro.component';
import { InicioComponent } from './inicio/inicio.component';
import { RestaurantesComponent } from './restaurantes/restaurantes.component';
import { SobreComponent } from './sobre/sobre.component';

const routes: Routes = [
  {path:"",redirectTo:"inicio",pathMatch:"full"},
  {path:"restaurantes", component:RestaurantesComponent},
  {path:"sobre", component:SobreComponent},
  {path:"inicio", component:InicioComponent},
  {path:"contato", component:ContatoComponent},
  {path:"login", component:EntrarCadastroComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
