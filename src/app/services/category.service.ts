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

  async cargarListado() {
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

  async create(titulo: string, descripcion: string, boton: string, imagen: string | null, url: string, activo: number) {
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

  async updateCategoria(id: number, nuevoTitulo: string, nuevaDescripcion: string, nuevoBoton:string, nuevaImagen: string, nuevaUrl: string, nuevoActivo: Number) {
    // Sentencia SQL para actualizar la categoría
    let sql = 'UPDATE tbl_Categoria SET Titulo=?, Descripcion=?, Boton=?, Imagen=?, Url=?, Activo=? WHERE Id=?';

    try {
      const result = await CapacitorSQLite.executeSet({
        database: this.sqlite.dbName,
        set: [
          {
            statement: sql,
            values: [
              nuevoTitulo,
              nuevaDescripcion,
              nuevoBoton,
              nuevaImagen,
              nuevaUrl,
              nuevoActivo,
              id  // Parámetro para la cláusula WHERE
            ]
          }
        ]
      });
  

      // Verificación de cambios usando el modelo actualizado
      return result.changes && result.changes.changes > 0 
        ? 'Categoría actualizada exitosamente' 
        : 'No se realizaron cambios';

    } catch (err) {
      console.error('Error al actualizar la categoría:', err);
      throw err;
    }
  }

  async obtenerCategoriaPorId(id: number) {
    console.log("Obteniendo categoría con ID:", id);
    
    let sql = 'SELECT * FROM tbl_Categoria WHERE Id = ?';
    const dbName = await this.sqlite.getDbName();
    
    try {
      const result = await CapacitorSQLite.query({
        database: dbName,
        statement: sql,
        values: [id]
      });
  
      if (result.values && result.values.length > 0) {
        return result.values[0];
      } else {
        throw new Error('Categoría no encontrada');
      }
    } catch (err) {
      console.error('Error al obtener la categoría:', err);
      throw err;
    }
  }

}

