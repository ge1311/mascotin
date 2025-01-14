import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SaludPageRoutingModule } from './salud-routing.module';
import { SaludPage } from './salud.page';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaludPageRoutingModule,MatButtonModule, MatIconModule, MatCardModule
  ],
  declarations: [SaludPage]
})
export class SaludPageModule {}
