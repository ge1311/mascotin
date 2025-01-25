import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'iniciosesion', loadChildren: () => import('./iniciosesion/iniciosesion.module').then(m => m.IniciosesionPageModule) },
  { path: 'categorias', loadChildren: () => import('./categorias/categorias.module').then(m => m.CategoriasPageModule) },
  { path: 'registro', loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule) },
  { path: 'resenas', loadChildren: () => import('./resenas/resenas.module').then(m => m.ResenasPageModule) },
  { path: 'salud', loadChildren: () => import('./salud/salud.module').then(m => m.SaludPageModule) },
  { path: 'anecdotas', loadChildren: () => import('./anecdotas/anecdotas.module').then(m => m.AnecdotasPageModule) },
  {path: 'perfilusuario',loadChildren: () => import('./perfilusuario/perfilusuario.module').then( m => m.PerfilusuarioPageModule)},
  {path: 'admin', loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)},
  { 
    path: 'crear-categoria',
    loadComponent: () => import('./categorias/crear-categoria/crear-categoria.page').then(m => m.CrearCategoriaPage)
  },
  {
    path: 'articulos',
    loadChildren: () => import('./articulos/articulos.module').then( m => m.ArticulosPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],  
  exports: [RouterModule],
})
export class AppRoutingModule {}
