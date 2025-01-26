import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SqliteService } from '../service/sqlite.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  public language: string;
  public languages: string[];
  public isAdmin: boolean;

  constructor(private menu: MenuController,
              private sqlite: SqliteService,
              private authService: AuthService
  ) {
    this.language = '';
    this.languages = [];
    console.log("HomePage constructor");
  }

  ionViewWillEnter(){
    console.log("HomePage ionViewWillEnter");
    this.sqlite.dbReady.subscribe(ready => {
      if (ready) {
        this.validarAdmin();  
      } else {
        console.log("Base de datos aún no está lista");
      }
    });
    
  }

  async validarAdmin(){
    this.isAdmin = await this.authService.esUsuarioAdmin();
  }

  ngOnInit() {
    this.menu.enable(true);
  }

  openMenu() {
    this.menu.open();
  }
}