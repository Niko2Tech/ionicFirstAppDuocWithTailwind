import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  icono: string = 'oscuro';
  colorIcon: string = 'blue-400';

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    return
  }

  cambiarThema() {
    if (this.icono === 'oscuro') {
      this.icono = 'claro';
      this.colorIcon = 'white';
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.icono = 'oscuro';
      this.colorIcon = 'blue-400';
      this.renderer.removeClass(document.body, 'dark');
    }
  }
}
