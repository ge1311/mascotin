import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearCategoriaPage } from './crear-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: CrearCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearCategoriaPageRoutingModule {}
