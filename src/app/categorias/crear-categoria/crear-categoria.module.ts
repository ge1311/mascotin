import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrearCategoriaPageRoutingModule } from './crear-categoria-routing.module';
import { CrearCategoriaPage } from './crear-categoria.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        CrearCategoriaPageRoutingModule,
        CrearCategoriaPage  // Importar el componente como standalone
    ]
})
export class CrearCategoriaPageModule {}
