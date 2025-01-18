import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { AlertController, Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BDService {
  private db!: SQLiteDBConnection;

  // Definición de tablas
  private tablaUsuario: string = `CREATE TABLE IF NOT EXISTS usuario (
    idusuario INTEGER PRIMARY KEY AUTOINCREMENT,
    correo VARCHAR(50) NOT NULL,
    clave VARCHAR(16) NOT NULL,
    foto BLOB
  );`;

  constructor(
    private platform: Platform,
    private alertController: AlertController
  ) {
    this.platform.ready().then(() => {
      this.inicializarBD();
    });
  }

  private async inicializarBD() {
    try {
      // Crear conexión con la base de datos
      this.db = await CapacitorSQLite.createConnection({
        database: 'mascotin',
        version: 1,
        encrypted: false,
        mode: 'no-encryption'
      });
    
      // Abrir la base de datos
      await this.db.open();
      await this.crearTablas();
      console.log('Base de datos inicializada correctamente.');
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudo inicializar la base de datos: ' + error);
    }
  }

  private async crearTablas() {
    try {
      await this.db.execute(this.tablaUsuario);
      console.log('Tablas creadas correctamente.');
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudieron crear las tablas: ' + error);
    }
  }

  public async insertarUsuario(correo: string, clave: string, foto?: Blob) {
    const query = `INSERT INTO usuario (correo, clave, foto) VALUES (?, ?, ?)`;
    const values = [correo, clave, foto || null];

    try {
      await this.db.run(query, values);
      console.log('Usuario insertado correctamente.');
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudo insertar el usuario: ' + error);
    }
  }

  public async obtenerUsuarios() {
    const query = `SELECT * FROM usuario`;

    try {
      const result = await this.db.query(query);
      return result.values ? result.values : [];
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudieron obtener los usuarios: ' + error);
      return [];
    }
  }

  private async mostrarAlerta(titulo: string, mensaje: string) {
    const alerta = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    await alerta.present();
  }

  public async cerrarConexion() {
    try {
      await this.db.close();
      console.log('Conexión a la base de datos cerrada.');
    } catch (error) {
      this.mostrarAlerta('Error', 'No se pudo cerrar la conexión a la base de datos: ' + error);
    }
  }
}
