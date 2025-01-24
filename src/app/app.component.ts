import { Component } from '@angular/core';
import { Device } from '@capacitor/device';
import { MenuController, Platform } from '@ionic/angular';
import { SqliteService } from './service/sqlite.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone:false
})
export class AppComponent {
  public isWeb: boolean;
  public load: boolean;

  constructor(private menuCtrl: MenuController, 
              private platform: Platform,
              private sqlite: SqliteService) {
    this.isWeb = false;
    this.load = false;
    this.initApp();
  }

  initApp(){
    this.platform.ready().then( async () => {
      const info = await Device.getInfo();
      this.isWeb = info.platform == 'web';
      this.sqlite.init();
      this.sqlite.dbReady.subscribe( load => {
        this.load = load;
      });
    })
  }
}