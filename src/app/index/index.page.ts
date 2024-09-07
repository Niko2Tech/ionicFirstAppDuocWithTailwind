import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  icono: string = '';
  logoDuoc: string = '';
  // obtenemos el tema del sistema
  getTheme() {
    const html = document.querySelector('html');
    if (html?.classList.contains('dark')) {
      this.icono = 'claro';
      this.logoDuoc = 'duoc_logo_blanco';
    } else {
      this.icono = 'oscuro';
      this.logoDuoc = 'duoc_logo_oscuro';
    }
    return
  }

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.getTheme();
    return
  }

  cambiarThema() {
    const html = document.querySelector('html');
    if (html?.classList.contains('dark')) {
      html?.classList.remove('dark');
      this.icono = 'oscuro';
      this.logoDuoc = 'duoc_logo_oscuro';
    } else {
      html?.classList.add('dark');
      this.icono = 'claro';
      this.logoDuoc = 'duoc_logo_blanco';
    }
  }  
}
