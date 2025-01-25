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
  imagen: string = '';
  activo: boolean = true;
  idCategoria: number | null = null;

  constructor(private router: Router,
              private articulosService: ArticulosService,
              private navCtrl: NavController
  ) { }

  ngOnInit() {
    // Capturar el ID de la categoría desde el estado de la navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['categoriaId']) {
      this.idCategoria = Number(navigation.extras.state['categoriaId']);
      console.log('ID de Categoría recibido:', this.idCategoria);
    } else {
      console.warn('No se recibió ID de Categoría, redirigiendo...');
      this.router.navigate(['/articulos']);  // Redirigir si no hay ID
    }
  }

  cancelar() {
    this.navCtrl.back(); // Vuelve a la página anterior sin guardar
  }

  async guardarArticulo() {
    if (!this.titulo || !this.descripcion || !this.idCategoria) {
      console.error('Por favor, complete todos los campos');
      return;
    }

    const nuevoArticulo = {
      Id_Categoria: this.idCategoria,
      Titulo_Articulo: this.titulo,
      Descripcion: this.descripcion,
      Imagen: this.imagen || 'default.jpg',
      Activo: this.activo ? 1 : 0
    };

    console.log('Guardando artículo:', nuevoArticulo);
    try {
      await this.articulosService.agregarArticulo(nuevoArticulo);
      console.log('Artículo guardado con éxito');
      this.router.navigate([`/articulos/${this.idCategoria}`]);  // Redirigir a la lista de artículos
    } catch (error) {
      console.error('Error al guardar el artículo:', error);
    }

  }
}
