import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrudArticulosPageRoutingModule } from './crud-articulos-routing.module';
import { CrudArticulosPage } from './crud-articulos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrudArticulosPageRoutingModule,
    CrudArticulosPage
  ]
})
export class CrudArticulosPageModule {}
