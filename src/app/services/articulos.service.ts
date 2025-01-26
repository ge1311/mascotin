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

  async agregarArticulo(articulo: any): Promise<void> {
    const query = `
      INSERT INTO tbl_Articulo (Id_Categoria, Id_Usuario, Titulo_Articulo, Imagen, Descripcion, Activo, Fecha)
      VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
    `;

    const values = [
      articulo.Id_Categoria,
      1, // Aquí debes incluir el ID del usuario autenticado
      articulo.Titulo_Articulo,
      articulo.Imagen,
      articulo.Descripcion,
      articulo.Activo
    ];

    try {
      await CapacitorSQLite.query({
        database: this.sqliteService.dbName,
        statement: query,
        values: values
      });

      console.log('Artículo guardado correctamente en la base de datos.');
    } catch (error) {
      console.error('Error al guardar el artículo:', error);
      throw error;
    }
  }

  async updateArticulo(id: number, nuevoTitulo: string, nuevaDescripcion: string, nuevaImagen: string, nuevoActivo: number) {
      let sql = 'UPDATE tbl_Articulo SET Titulo_Articulo=?, Descripcion=?, Imagen=?, Activo=? WHERE Id=?';

      try {
        const result = await CapacitorSQLite.executeSet({
          database: this.sqliteService.dbName,
          set: [
            {
              statement: sql,
              values: [
                nuevoTitulo,
                nuevaDescripcion,
                nuevaImagen,
                nuevoActivo,
                id
              ]
            }
          ]
        });

        return result.changes && result.changes.changes > 0 
          ? 'Artículo actualizado exitosamente' 
          : 'No se realizaron cambios';

      } catch (err) {
        console.error('Error al actualizar el artículo:', err);
        throw err;
      }
  }

  async obtenerArticuloPorId(id: number) {
    const sql = 'SELECT * FROM tbl_Articulo WHERE Id = ?';
    try {
      const result = await CapacitorSQLite.query({
        database: this.sqliteService.dbName,
        statement: sql,
        values: [id]
      });
  
      if (result.values && result.values.length > 0) {
        return result.values[0];  // Retorna el primer resultado encontrado
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error al obtener el artículo:', error);
      throw error;
    }
  }
  
  async eliminarArticulo(id: number) {
    const sql = 'DELETE FROM tbl_Articulo WHERE Id = ?';
    try {
      const result = await CapacitorSQLite.executeSet({
        database: this.sqliteService.dbName,
        set: [
          {
            statement: sql,
            values: [id]
          }
        ]
      });
  
      // Verificar si se eliminaron registros
      if (result.changes && result.changes.changes > 0) {
        return result; 
      } else {
        return { changes: { changes: 0 } };
      }
    } catch (error) {
      console.error('Error al eliminar el articulo:', error);
      throw error;
    }
  }

}
