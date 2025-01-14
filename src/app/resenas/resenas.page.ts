import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-resenas',
  templateUrl: './resenas.page.html',
  styleUrls: ['./resenas.page.scss'],
  standalone: false,
})
export class ResenasPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true);
  }

  openMenu() {
    this.menu.open();
  }

}