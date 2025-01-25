import { Injectable } from '@angular/core';
import { CapacitorSQLite } from '@capacitor-community/sqlite';
import { Platform } from '@ionic/angular';
import { SqliteService } from './sqlite.service';

@Injectable({
  providedIn: 'root'
})
export class BDService {

  constructor(
    private sqlite: SqliteService,
    private platform: Platform
  ) {}
  // Insertar un usuario
  insertarUsuario(correo: string, clave: string, foto?: Blob) {
    const query = `INSERT INTO usuario (correo, clave, foto) VALUES (?, ?, ?)`;
    const values = [correo, clave, foto || null];

    //return this.database.executeSql(query, values).then(() => {
    //   console.log('Usuario insertado correctamente en la base de datos.');
    // }).catch((error) => {
    //   console.log('Error al insertar el usuario en la base de datos: ', error);
    // });
  }

  // Obtener todos los usuarios
  async obtenerUsuarios() {
    const res = await CapacitorSQLite.query({
      database: this.sqlite.dbName,
      statement: 'SELECT Id, Nombres, Nickname, Correo, Telefono, Foto_Perfil, Activo FROM tbl_Usuario;',
      values: []
    });
    
    if (res.values && res.values.length > 0) {
      return res.values;  // Retorna los valores correctos
    } else {
      return [];
    }
  }
  
}
