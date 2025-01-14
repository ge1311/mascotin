import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';



import { CategoriasPageRoutingModule } from './categorias-routing.module';
import { CategoriasPage } from './categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriasPageRoutingModule, 
    MatIconModule,    // Ya lo tienes
    MatCardModule, 
  ],
  declarations: [CategoriasPage],  
})
export class CategoriasPageModule {}
