import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-salud',
  templateUrl: './salud.page.html',
  styleUrls: ['./salud.page.scss'],
  standalone: false,
})
export class SaludPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {
    this.menu.enable(true);
  }

  openMenu() {
    this.menu.open();
  }

}