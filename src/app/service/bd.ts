import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BDService {
  //public database!: SQLiteObject;

  // Definir la tabla de usuario
  private tablaUsuario: string = `CREATE TABLE IF NOT EXISTS usuario (
    idusuario INTEGER PRIMARY KEY AUTOINCREMENT,
    correo VARCHAR(50) NOT NULL,
    clave VARCHAR(16) NOT NULL,
    foto BLOB
  );`;

  constructor(
    //private sqlite: SQLite,
    private platform: Platform
  ) {
    this.platform.ready().then(() => {
      this.inicializarBD();
    });
  }

  // Inicializar la base de datos
  private async inicializarBD() {
    try {
      //this.database = await this.sqlite.create({
      //   name: 'mascotin.db',
      //   location: 'default'
      // });
      await this.crearTablas();
      console.log('Base de datos inicializada correctamente.');
    } catch (error) {
      console.log('Error al inicializar la base de datos: ', error);
    }
  }

  // Crear las tablas en la base de datos
  private async crearTablas() {
    try {
      //await this.database.executeSql(this.tablaUsuario, []);
      console.log('Tablas creadas correctamente.');
    } catch (error) {
      console.log('Error al crear las tablas: ', error);
    }
  }

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
  obtenerUsuarios() {
    const query = `SELECT * FROM usuario`;
    // return this.database.executeSql(query, []).then((data) => {
    //   const usuarios = [];
    //   for (let i = 0; i < data.rows.length; i++) {
    //     usuarios.push(data.rows.item(i));  // Guardamos cada usuario
    //   }
    //   return usuarios;  // Retorna el array de usuarios
    // }).catch((error) => {
    //   console.log('Error al obtener los usuarios: ', error);
    //   return [];
    // });
  }
}
