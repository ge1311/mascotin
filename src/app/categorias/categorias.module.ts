import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { IonicModule } from '@ionic/angular';
import { CategoriasPageRoutingModule } from './categorias-routing.module';
import { CategoriasPage } from './categorias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriasPageRoutingModule, 
    MatIconModule, 
    MatCardModule, 
  ],
  declarations: [CategoriasPage],  
})
export class CategoriasPageModule {}
