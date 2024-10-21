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
  nombre_res: string = '';
  rut_res: string = '';
  telefono_res: string = '';
  direccion_res: string = '';
  // errores
  nombre_res_error: string = '';
  rut_res_error: string = '';
  telefono_res_error: string = '';
  direccion_res_error: string = '';
  rutRegex: RegExp = /^\d{1,2}\.\d{3}\.\d{3}-[0-9kK]$/;
  telefonoRegex = /^\+56\d{9}$/;
  
  
  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.getTheme();
    this.getSeccion();
  }

  getSeccion() {
    const session = JSON.parse(localStorage.getItem('session') || '{}');
    if (session && session.expiration > new Date().getTime()) {
      // Si hay sesión y no ha expirado, redirigimos al home directamente
      this.navCtrl.navigateForward('/home');
    } else {
      localStorage.removeItem('session');
    }
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
    // Limpiamos los errores
    this.limpiarErrores();
  
    // Verificamos el formato del correo 
    if (!this.correo.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      this.correo_error = 'Formato de correo incorrecto';
      return;
    }
  
    // Verificamos la longitud del password
    if (this.password.length < 5) {
      this.password_error = 'Contraseña no válida';
      return;
    }
  
    // Recuperamos los usuarios del LocalStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.find((u: any) => u.correo === this.correo && u.password === this.password);
  
    if (user) {
      // Guardar la sesión en LocalStorage con tiempo de expiración
      const expirationTime = new Date().getTime() + 3600000; // 1 hora en milisegundos
      localStorage.setItem('session', JSON.stringify({
        correo: this.correo,
        expiration: expirationTime
      }));
  
      // Navegamos a la página de inicio
      this.navCtrl.navigateForward('/home');
    } else {
      this.error_general = 'Correo o contraseña incorrectos';
    }
  }
  

  registroButton() {
    if (this.nombre_res.length < 8) {
      this.nombre_res_error = 'Nombre y apellido muy corto';
      return
    }
    if (!this.rut_res.match(this.rutRegex)) {
      this.rut_res_error = 'Formato de rut incorrecto';
      return
    }
    if (!this.telefono_res.match(this.telefonoRegex)) {
      this.telefono_res_error = 'Formato de telefono incorrecto';
      return
    }
    if (this.direccion_res.length < 5) {
      this.direccion_res_error = 'Direccion muy corta';
      return
    }
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
    

    // Guardar el usuario en LocalStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push({
      correo: this.correo_res,
      password: this.password_res,
      nombre: this.nombre_res,
      telefono: this.telefono_res,
      rut: this.rut_res,
      direccion: this.direccion_res,
      viajes_creados: [],  // Inicializamos el array vacío
      viajes_solicitados: []  // Inicializamos el array vacío
    });
    localStorage.setItem('users', JSON.stringify(users));

    const expirationTime = new Date().getTime() + 3600000; // 1 hora en milisegundos
    localStorage.setItem('session', JSON.stringify({
      correo: this.correo_res,
      expiration: expirationTime
    }));

    this.navCtrl.navigateForward('/home');
  }
   
  limpiarErrores() {
    this.correo_error = '';
    this.password_error = '';
    this.error_general = '';
    this.nombre_res_error = '';
    this.rut_res_error = '';
    this.telefono_res_error = '';
    this.direccion_res_error = '';
    this.correo_res_error = '';
    this.password_res_error = '';
    this.password_confirm_error = '';
  }
  formatRut(value: string = ""): string {
    // Elimina caracteres no válidos, solo deja dígitos y 'K' o 'k'
    let cleanValue = value.replace(/[^0-9kK]/g, '');
  
    // Aplica el formateo del RUT
    if (cleanValue.length > 7) {
      return `${cleanValue.slice(0, -7)}.${cleanValue.slice(-7, -4)}.${cleanValue.slice(-4, -1)}-${cleanValue.slice(-1)}`;
    } else if (cleanValue.length > 4) {
      return `${cleanValue.slice(0, -4)}.${cleanValue.slice(-4, -1)}-${cleanValue.slice(-1)}`;
    } else if (cleanValue.length > 1) {
      return `${cleanValue.slice(0, -1)}-${cleanValue.slice(-1)}`;
    }
    
    return cleanValue;
  }

  limpiarYFormatearRut() {
    this.rut_res_error = '';
    this.rut_res = this.formatRut(this.rut_res);
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
