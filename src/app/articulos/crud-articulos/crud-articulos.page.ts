import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, NavController } from '@ionic/angular';
import { ArticulosService } from 'src/app/services/articulos.service';

@Component({
  selector: 'app-crud-articulos',
  templateUrl: './crud-articulos.page.html',
  styleUrls: ['./crud-articulos.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule]
})
export class CrudArticulosPage implements OnInit {

  titulo: string = '';
  descripcion: string = '';
  imagen: string = 'imagenes/1.jpg';
  activo: boolean = true;
  idCategoria: number | null = null;
  idArticulo: number | null = null;

  constructor(private router: Router,
              private articulosService: ArticulosService,
              private navCtrl: NavController
  ) { }

  ngOnInit() {
    // Capturar el ID de la categoría desde el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      if (navigation.extras.state['articuloId']) {
        this.idArticulo = Number(navigation.extras.state['articuloId']);
        console.log('ID de Artículo recibido:', this.idArticulo);
        this.cargarArticulo(this.idArticulo);
      } 
      if (navigation.extras.state['categoriaId']) {
        this.idCategoria = Number(navigation.extras.state['categoriaId']);
        console.log('ID de Categoría recibido:', this.idCategoria);
      }
    } else {
      console.log('Creando un nuevo artículo, no se recibió categoría.');
      this.router.navigate(['/articulos']);
    }
  }

  async cargarArticulo(id: number) {
    try {
      const articulo = await this.articulosService.obtenerArticuloPorId(id);
      if (articulo) {
        this.titulo = articulo.Titulo_Articulo;
        this.descripcion = articulo.Descripcion;
        this.imagen = articulo.Imagen;
        this.activo = articulo.Activo === 1;
        this.idCategoria = articulo.Id_Categoria;
      } else {
        console.warn('No se encontró el artículo, redirigiendo...');
        this.router.navigate(['/articulos']);
      }
    } catch (error) {
      console.error('Error al cargar el artículo:', error);
      this.router.navigate(['/articulos']);
    }
  }

  cancelar() {
    this.navCtrl.back(); // Vuelve a la página anterior sin guardar
  }

  async guardarArticulo() {
    const nuevoArticulo = {
      Id_Categoria: this.idCategoria,
      Titulo_Articulo: this.titulo,
      Descripcion: this.descripcion,
      Imagen: this.imagen || 'default.jpg',
      Activo: this.activo ? 1 : 0
    };

    try {
      if (this.idArticulo) {
        // Actualización de artículo existente
        const mensaje = await this.articulosService.updateArticulo(
          this.idArticulo,
          this.titulo,
          this.descripcion,
          this.imagen || 'default.jpg',
          this.activo ? 1 : 0
        );
        console.log(mensaje);
      } else {
        await this.articulosService.agregarArticulo(nuevoArticulo);
        console.log('Artículo guardado con éxito');
      }
  
      this.router.navigate([`/articulos/${this.idCategoria}`]);  // Redirigir a la lista de artículos
    } catch (error) {
      console.error('Error al guardar el artículo:', error);
    }

  }
}
