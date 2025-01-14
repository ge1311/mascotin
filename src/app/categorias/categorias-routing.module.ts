import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasPage } from './categorias.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriasPage,  
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule],
})
export class CategoriasPageRoutingModule {}
