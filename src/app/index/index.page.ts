import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {
  icono: string = '';
  logoDuoc: string = '';
  bg_fondo: string = '';
  words: string[] = ['Rapido', 'Seguro', 'Economico'];
  displayedText: string = '';
  i: number = 0;  
  j: number = 0; 
  isDeleting: boolean = false;
  currentWord: string = '';
  constructor(private navCtrl: NavController) { }

  

  ngOnInit() {
    this.getTheme();
    this.type();
  }

  getTheme() {
    const html = document.querySelector('html');
    if (html?.classList.contains('dark')) {
      this.icono = 'claro';
      this.logoDuoc = 'duoc_logo_blanco';
      this.bg_fondo = 'bg-vector-dark';
    } else {
      this.icono = 'oscuro';
      this.logoDuoc = 'duoc_logo_oscuro';
      this.bg_fondo = 'bg-vector-white';  // Ajusta el valor por defecto aquí
    }
  }

  cambiarThema() {
    const html = document.querySelector('html');
    if (html?.classList.contains('dark')) {
      html?.classList.remove('dark');
      this.icono = 'oscuro';
      this.logoDuoc = 'duoc_logo_oscuro';
      this.bg_fondo = 'bg-vector-white';
    } else {
      html?.classList.add('dark');
      this.icono = 'claro';
      this.logoDuoc = 'duoc_logo_blanco';
      this.bg_fondo = 'bg-vector-dark';
    }
  }

  // Función para mostrar un efecto de texto
  type() {
    this.currentWord = this.words[this.i];
    if (this.isDeleting) {
      this.displayedText = this.currentWord.substring(0, this.j - 1);
      this.j--;
      if (this.j == 0) {
        this.isDeleting = false;
        this.i++;
        if (this.i == this.words.length) {
          this.i = 0;
        }
      }
    } else {
      this.displayedText = this.currentWord.substring(0, this.j + 1);
      this.j++;
      if (this.j == this.currentWord.length) {
        this.isDeleting = true;
        setTimeout(() => this.type(), 1000);  // Espera antes de comenzar a borrar
        return;
      }
    }
    setTimeout(() => this.type(), this.isDeleting ? 50 : 100);  // Ajusta la velocidad de escribir/borrar
  }

  navegar(ruta: string) {
    this.navCtrl.navigateForward(ruta);
    return
    
  }

}
