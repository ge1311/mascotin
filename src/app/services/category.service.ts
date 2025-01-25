import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteChanges, capSQLiteValues } from '@capacitor-community/sqlite';
import { SqliteService } from '../service/sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  public categoria: string;
  public categorias: string[];

  constructor(private sqlite: SqliteService) {
    this.categoria = '';
    this.categorias = [];
    console.log("CategoryService constructor");
  }

  async read() {
    console.log("CategoryService read");
    let sql = 'SELECT * FROM tbl_Categoria';
    const dbName = await this.sqlite.getDbName();
    return CapacitorSQLite.query({
      database: dbName,
      statement: sql,
      values: [] // necesario para android
    }).then((response: capSQLiteValues) => {
      let categorias: string[] = [];

      if (this.sqlite.isIOS && response.values.length > 0) {
        response.values.shift();
      }

      // recorremos los datos
      for (let index = 0; index < response.values.length; index++) {
        const categoria = response.values[index];
        categorias.push(categoria);
      }
      console.log('datos for' + categorias);
      return categorias;

    }).catch(err => Promise.reject(err))
  }

  async create(titulo: string, descripcion: string, boton: string, imagen: string | null, url: string, activo: boolean) {
    // Sentencia para insertar un registro
    let sql = 'INSERT INTO tbl_Categoria (Titulo, Descripcion, Boton, Imagen, Url, Activo) VALUES (?, ?, ?, ?, ?, ?)';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
    return CapacitorSQLite.executeSet({
      database: dbName,
      set: [
        {
          statement: sql,
          values: [
            titulo,
            descripcion,
            boton,
            imagen,
            url,
            activo ? 1 : 0  // Convertimos booleano a 1 o 0
          ]
        }
      ]
    }).then((changes: capSQLiteChanges) => {
      // Si es web, debemos guardar el cambio en la webstore manualmente
      if (this.sqlite.isWeb) {
        CapacitorSQLite.saveToStore({ database: dbName });
      }
      return changes;
    }).catch(err => Promise.reject(err))
  }


}
