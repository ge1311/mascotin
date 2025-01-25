import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteValues } from '@capacitor-community/sqlite';
import { SqliteService } from '../service/sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  constructor(private sqliteService: SqliteService) {}

  async obtenerTodosLosArticulos() {
    const sql = 'SELECT * FROM tbl_Articulo';
    const dbName = await this.sqliteService.getDbName();
    return CapacitorSQLite.query({
      database: this.sqliteService.dbName,
      statement: sql,
      values: []  // Necesario para Android
    }).then((response: capSQLiteValues) => {
      let articulos: any[] = [];

      // Para iOS, se elimina la primera fila si es necesario
      if (this.sqliteService.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // Procesar los resultados
      for (let index = 0; index < response.values.length; index++) {
        const articulo = response.values[index];
        articulos.push(articulo);
      }

      console.log('Artículos obtenidos:', articulos);
      return articulos;

    }).catch(err => {
      console.error('Error al obtener artículos:', err);
      return Promise.reject(err);
    });
  }
}
