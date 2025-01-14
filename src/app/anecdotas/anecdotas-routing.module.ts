import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AnecdotasPage } from './anecdotas.page';

const routes: Routes = [
  {
    path: '',
    component: AnecdotasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnecdotasPageRoutingModule {}
