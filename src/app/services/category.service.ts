import { Injectable } from '@angular/core';
import { CapacitorSQLite, capSQLiteValues } from '@capacitor-community/sqlite';
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
    // Sentencia para leer todos los registros
    let sql = 'SELECT * FROM languages';
    // Obtengo la base de datos
    const dbName = await this.sqlite.getDbName();
    // Ejecutamos la sentencia
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
        const language = response.values[index];
        categorias.push(language.name);
      }
      console.log('datos for' + categorias);
      return categorias;

    }).catch(err => Promise.reject(err))
  }

}
