import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  icono: string = '';
  logoDuoc: string = '';
  usuario: string = 'Admin';
  carrera_por_defecto: string = 'ING. Informatica';
  destino: string = '';
  valor: number = 0;
  asientosDisponibles: number = 0;
  asientosTotales: number = 0;
  nota: number = 4;

  viajes = [
    {
      id: 1,
      usuario: 'Lucas Flores',
      carrera: 'ING. Informatica',
      destino: 'Altos del Maiten',
      valor: 1500,
      asientosDisponibles: 3,
      asientosTotales: 5,
      nota: 2
    },
    {
      id: 2,
      usuario: 'Juan Perez',
      carrera: 'Mecanica',
      destino: 'Lomas de manso',
      valor: 1000,
      asientosDisponibles: 2,
      asientosTotales: 3,
      nota: 3.5
    },
    {
      id: 3,
      usuario: 'Luis Hernandez',
      carrera: 'ING. Informatica',
      destino: 'Bollenar',
      valor: 2000,
      asientosDisponibles: 4,
      asientosTotales: 5,
      nota: 4.5
    }
  ];
  modalAbierto: string | null = null;
  animateClass: string = '';
  
  constructor() {}

  ngOnInit() {
    this.getTheme();
  }

  abrirModal(id:string) {
    this.animateClass = 'animate-slide-in'; 
    this.modalAbierto = id;
  }

  cerrarModal() {
    this.animateClass = 'animate-slide-out'; 
    setTimeout(() => {
      this.modalAbierto = null;
    }, 300); 
  }

  getTheme() {
    const html = document.querySelector('html');
    if (html?.classList.contains('dark')) {
      this.icono = 'claro';
      this.logoDuoc = 'duoc_logo_blanco';
    } else {
      this.icono = 'oscuro';
      this.logoDuoc = 'duoc_logo_oscuro';
    }
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

  // Rutas de las imágenes
  starFull = 'star';
  starHalf = 'star-half';
  starEmpty = 'star-outline';

  getStars(nota: number): string[] {
    const stars = [];
    const fullStars = Math.floor(nota); 
    const hasHalfStar = nota % 1 >= 0.25 && nota % 1 < 0.75; 
    const emptyStars = 5 - Math.ceil(nota); 

    for (let i = 0; i < fullStars; i++) {
      stars.push(this.starFull);
    }

    if (hasHalfStar) {
      stars.push(this.starHalf);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(this.starEmpty);
    }

    return stars;
  }

  agregarViaje() {
    const nuevoId = this.viajes.length > 0 ? Math.max(...this.viajes.map(v => v.id)) + 1 : 1;

    const nuevoViaje = {
      id: nuevoId,
      usuario: this.usuario,
      carrera: this.carrera_por_defecto,
      destino: this.destino,
      valor: this.valor,
      asientosDisponibles: this.asientosDisponibles,
      asientosTotales: this.asientosTotales,
      nota: this.nota, 
    };

    this.viajes.push(nuevoViaje);
    this.cerrarModal();
  }

}
