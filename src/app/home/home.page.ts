import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  fecha: Date = new Date();
  
  constructor() {}

  mostrarFecha() {
    console.log(this.fecha);
  }

}
