import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilusuarioPage } from './perfilusuario.page'; // Importación correcta

const routes: Routes = [
  {
    path: '',
    component: PerfilusuarioPage, // Uso correcto de la clase
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilusuarioPageRoutingModule {}
