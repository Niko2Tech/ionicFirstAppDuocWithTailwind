import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-50px)'
      })),
      transition(':enter', [
        animate('300ms ease-in', style({
          opacity: 1,
          transform: 'translateY(-10)'
        }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({
          opacity: 0,
          transform: 'translateY(-50px)'
        }))
      ])
    ]),
    trigger('fadeInOutLoginRegister', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoginPage implements OnInit {

  icono: string = '';
  logoDuoc: string = '';
  bg_fondo: string = '';
  correo: string = '';
  password: string = '';
  correo_error: string = '';
  password_error: string = '';	
  error_general: string = '';
  login: boolean = true;
  registro: boolean = false;
  correo_res: string = '';
  password_res: string = '';
  correo_res_error: string = '';
  password_res_error: string = '';
  password_confirm: string = '';
  password_confirm_error: string = '';
  
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.getTheme();
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

  navegar(ruta: string) {
    this.navCtrl.navigateBack(ruta);
    return
  }

  loginButton() {
    // verificamos el formato del correo 
    if (!this.correo.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      this.correo_error = 'Formato de correo incorrecto';
      return
    }
    // verificamos la longitud del correo
    if (this.correo.length < 5) {
      this.correo_error = 'Correo muy corto';
      return
    }
    // verificamos la longitud del password
    if (this.password.length < 5) {
      this.password_error = 'Contraseña muy corta';
      return
    }
    if (this.correo == 'admin@admin.com' && this.password == 'admin') {
      this.navCtrl.navigateForward('/home');
    } else {
      this.error_general = 'Correo o contraseña incorrectos';
    }
    return
  }

  registroButton() {
    // verificamos el formato del correo
    if (!this.correo_res.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      this.correo_res_error = 'Formato de correo incorrecto';
      return
      }
    // verificamos la longitud del correo
    if (this.correo_res.length < 5) {
      this.correo_res_error = 'Correo muy corto';
      return
    }
    // verificamos la longitud del password
    if (this.password_res.length < 5) {
      this.password_res_error = 'Contraseña muy corta';
      return
    }
    if (this.password_confirm != this.password_res) {
      this.password_confirm_error = 'Las contraseñas no coinciden';
      return
    }
    this.navCtrl.navigateForward('/home');
  }

  iniciarMicrosoft() {
    this.navCtrl.navigateForward('/home');
  }
   
  limpiarErrores() {
    this.correo_error = '';
    this.password_error = '';
    this.error_general = '';
  }

  mostrarRegistro() {
    this.login = false;
    setTimeout(() => {
      this.registro = true;
    }, 500);
  }

  mostrarLogin() {
    this.registro = false;
    setTimeout(() => {
      this.login = true;
    }, 500);
  }

}
