import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { IniciosesionPageRoutingModule } from './iniciosesion-routing.module';
import { InicioSesionPage } from './iniciosesion.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciosesionPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [InicioSesionPage]
})
export class IniciosesionPageModule {}
