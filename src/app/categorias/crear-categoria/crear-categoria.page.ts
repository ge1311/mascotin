import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { CategoryService } from 'src/app/services/category.service';


@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.page.html',
  styleUrls: ['./crear-categoria.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class CrearCategoriaPage {
    categoria = {
      Titulo: '',
      Descripcion: '',
      Boton: '',
      Imagen: '',
      Url: '',
      Activo: true
    };

    constructor(private categoryService: CategoryService,
                private navCtrl: NavController
    ) {}

    guardar() {
      // Crear la nueva categoría usando los datos del formulario
      this.categoryService.create(
        this.categoria.Titulo.toUpperCase(),  // Título en mayúsculas
        this.categoria.Descripcion || "Descripción de prueba", // Descripción predeterminada si está vacía
        this.categoria.Boton || "Ver", // Botón predeterminado
        this.categoria.Imagen || null,  // Imagen (puede ser null)
        this.categoria.Url,
        this.categoria.Activo           // Estado de la categoría
      ).then((changes) => {
        console.log(changes);
        console.log("Categoría creada");
        this.navCtrl.back(); // Regresa a la página anterior después de guardar
      }).catch(err => {
        console.error(err);
        console.error("Error al crear la categoría");
      });
    }  
    
    cancelar() {
      this.navCtrl.back(); // Vuelve a la página anterior sin guardar
    }
  }
