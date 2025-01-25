import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { SqliteService } from 'src/app/service/sqlite.service';
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
      Imagen: 'imagenes/4.jpg',
      Url: '',
      Activo: true
    };

    idCategoria: number | null = null;

    constructor(private categoryService: CategoryService,
                private navCtrl: NavController,
                private sqlite: SqliteService,
                private route: ActivatedRoute
    ) {}

    ionViewWillEnter() {
      console.log("CrearCategoriaPage ionViewWillEnter");
      this.sqlite.dbReady.subscribe(ready => {
        if (ready) {
          this.verificarModo();
        } else {
          console.log("Base de datos aún no está lista");
        }
      });  
    }

    verificarModo() {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.idCategoria = Number(id);
        console.log('Modo edición. ID de categoría:', this.idCategoria);
        this.cargarCategoria();
      } else {
        console.log('Modo creación de nueva categoría');
      }
    }

    async cargarCategoria() {
      if (!this.idCategoria) {
        return;
      }
    
      try {
        const categoria = await this.categoryService.obtenerCategoriaPorId(this.idCategoria);
        if (categoria) {
          this.categoria = {
            Titulo: categoria.Titulo,
            Descripcion: categoria.Descripcion,
            Boton: categoria.Boton,
            Imagen: categoria.Imagen,
            Url: categoria.Url,
            Activo: categoria.Activo === 1  // Convertir a booleano si es necesario
          };
          console.log('Categoría cargada:', this.categoria);
        }
      } catch (error) {
        console.error('Error al cargar la categoría:', error);
      }
    }

    guardar() {
      if (this.idCategoria) {
        // Actualizar categoría existente
        this.categoryService.updateCategoria(
          this.idCategoria,
          this.categoria.Titulo.toUpperCase(),
          this.categoria.Descripcion || "Descripción de prueba",
          this.categoria.Boton || "Ver",
          this.categoria.Imagen  || null,
          this.categoria.Url,
          this.categoria.Activo ? 1 : 0  // Convertir booleano a entero
        ).then((changes) => {
          console.log(changes);
          console.log("Categoría actualizada");
          this.navCtrl.back(); // Regresa a la página anterior
        }).catch(err => {
          console.error(err);
          console.error("Error al actualizar la categoría");
        });
    
      } else {
        // Crear nueva categoría
        this.categoryService.create(
          this.categoria.Titulo.toUpperCase(),
          this.categoria.Descripcion || "Descripción de prueba",
          this.categoria.Boton || "Ver",
          this.categoria.Imagen  || null,
          this.categoria.Url,
          this.categoria.Activo ? 1 : 0  // Convertir booleano a entero
        ).then((changes) => {
          console.log(changes);
          console.log("Categoría creada");
          this.navCtrl.back(); // Regresa a la página anterior
        }).catch(err => {
          console.error(err);
          console.error("Error al crear la categoría");
        });
      }
    }

    cancelar() {
      this.navCtrl.back(); // Vuelve a la página anterior sin guardar
    }
}

