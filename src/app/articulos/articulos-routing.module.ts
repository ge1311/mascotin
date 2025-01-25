import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticulosPage } from './articulos.page';

const routes: Routes = [
  {
    path: '',
    component: ArticulosPage
  },  {
    path: 'crud-articulos',
    loadChildren: () => import('./crud-articulos/crud-articulos.module').then( m => m.CrudArticulosPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticulosPageRoutingModule {}
