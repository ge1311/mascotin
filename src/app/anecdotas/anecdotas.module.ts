import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  
import { AnecdotasPageRoutingModule } from './anecdotas-routing.module';
import { AnecdotasPage } from './anecdotas.page';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  
    AnecdotasPageRoutingModule,MatButtonModule, MatIconModule, MatCardModule
  ],
  declarations: [AnecdotasPage],
})
export class AnecdotasPageModule {}
