import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private autenticado = new BehaviorSubject<boolean>(false);
  usuarioAutenticado$ = this.autenticado.asObservable();

  private readonly USER_KEY = 'usuarioActivo';

  async guardarUsuario(usuario: any): Promise<void> {
    const usuarioStr = JSON.stringify(usuario);
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({ key: this.USER_KEY, value: usuarioStr });
    } else {
      localStorage.setItem(this.USER_KEY, usuarioStr);
    }
    // Actualiza el estado de autenticación después de guardar el usuario
    this.autenticado.next(true);
  }

  async obtenerUsuario(): Promise<any | null> {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Preferences.get({ key: this.USER_KEY });
      return value ? JSON.parse(value) : null;
    } else {
      const usuarioStr = localStorage.getItem(this.USER_KEY);
      console.log('Usuario ' + usuarioStr);
      return usuarioStr ? JSON.parse(usuarioStr) : null;
    }
  }

  async eliminarUsuario(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await Preferences.remove({ key: this.USER_KEY });
    } else {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  async estaAutenticado(): Promise<boolean> {
    const usuario = await this.obtenerUsuario();
    const estaAutenticado = usuario !== null;
    this.autenticado.next(estaAutenticado);
    return estaAutenticado;
  }

  async esUsuarioAdmin(): Promise<boolean> {
    try {
      const usuario = await this.obtenerUsuario();
      return Number(usuario?.Admin) === 1;
    } catch (error) {
      console.error('Error al verificar si el usuario es admin:', error);
      return false;
    }
  }
  
  
  

}
