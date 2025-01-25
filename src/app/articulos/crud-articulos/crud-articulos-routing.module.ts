import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrudArticulosPage } from './crud-articulos.page';

const routes: Routes = [
  {
    path: '',
    component: CrudArticulosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrudArticulosPageRoutingModule {}
