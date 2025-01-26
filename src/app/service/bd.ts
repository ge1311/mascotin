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

  async insertarUsuario(nombres: string, nickname: string, correo: string, clave: string, telefono?: number, fotoPerfil?: string, admin: boolean = true, activo: boolean = true) {
    const sql = `
        INSERT INTO tbl_Usuario 
        (Nombres, Nickname, Correo, Clave, Telefono, Foto_Perfil, Admin, Activo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        nombres, 
        nickname, 
        correo, 
        clave, 
        telefono || null, 
        fotoPerfil || null, 
        admin ? 1 : 0, 
        activo ? 1 : 0
    ];

    try {
        const res = await CapacitorSQLite.run({
            database: this.sqlite.dbName,
            statement: sql,
            values: values
        });

        if (res.changes && res.changes.changes > 0) {
            console.log('Usuario insertado correctamente.');
            return true;
        } else {
            console.error('No se pudo insertar el usuario.');
            return false;
        }
    } catch (error) {
        console.error('Error al insertar usuario:', error);
        return false;
    }
}

// Obtener todos los usuarios
  async obtenerUsuarios() {
    const res = await CapacitorSQLite.query({
      database: this.sqlite.dbName,
      statement: 'SELECT Id, Nombres, Nickname, Correo, Telefono, Foto_Perfil, Clave, Activo, Admin FROM tbl_Usuario;',
      values: []
    });
    
    if (res.values && res.values.length > 0) {
      return res.values;  // Retorna los valores correctos
    } else {
      return [];
    }
  }
  
}
