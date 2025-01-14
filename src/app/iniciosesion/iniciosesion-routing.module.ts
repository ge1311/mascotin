import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionPage } from './iniciosesion.page';

const routes: Routes = [
  {
    path: '',
    component: InicioSesionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IniciosesionPageRoutingModule {}