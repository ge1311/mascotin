import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ResenasPageRoutingModule } from './resenas-routing.module';
import { ResenasPage } from './resenas.page';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResenasPageRoutingModule, MatButtonModule, MatIconModule, MatCardModule
  ],
  declarations: [ResenasPage]
})
export class ResenasPageModule {}
