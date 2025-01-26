import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SqliteService } from '../service/sqlite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  public language: string;
  public languages: string[];

  constructor(private menu: MenuController,
    private sqlite: SqliteService
  ) {
    this.language = '';
    this.languages = [];
    console.log("HomePage constructor");
  }

  ionViewWillEnter(){
    console.log("HomePage ionViewWillEnter");
    this.sqlite.dbReady.subscribe(ready => {
      if (ready) {
        
      } else {
        console.log("Base de datos aún no está lista");
      }
    });
    
  }

  ngOnInit() {
    this.menu.enable(true);
  }

  openMenu() {
    this.menu.open();
  }
}