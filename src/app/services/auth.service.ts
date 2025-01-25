import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USER_KEY = 'usuarioActivo';

  async guardarUsuario(usuario: any): Promise<void> {
    const usuarioStr = JSON.stringify(usuario);
    if (Capacitor.isNativePlatform()) {
      await Preferences.set({ key: this.USER_KEY, value: usuarioStr });
    } else {
      localStorage.setItem(this.USER_KEY, usuarioStr);
    }
  }

  async obtenerUsuario(): Promise<any | null> {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Preferences.get({ key: this.USER_KEY });
      return value ? JSON.parse(value) : null;
    } else {
      const usuarioStr = localStorage.getItem(this.USER_KEY);
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
    return usuario !== null;
  }
}
