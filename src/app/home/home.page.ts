import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

declare var google: any;

interface Viaje {
  id: number;
  usuario: string;
  carrera: string;
  destino: string;
  valor: number;
  fecha: Date;
  asientosDisponibles: number;
  asientosOcupados: number;
  asientosTotales: number;
  nota: number;
  idUsuariosIngresados: number[];
}
interface Usuario {
  correo: string;
  direccion: string;
  nombre: string;
  password: string;
  rut: string;
  telefono: string;
  viajes_creados: Viaje[];
  viajes_solicitados: Viaje[];
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-50px)'
      })),
      transition(':enter', [
        animate('300ms ease-in', style({
          opacity: 1,
          transform: 'translateY(-10px)'
        }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({
          opacity: 0,
          transform: 'translateY(-50px)'
        }))
      ])
    ])
  ]
})



export class HomePage implements OnInit {
  icono: string = '';
  logoDuoc: string = '';
  usuario: Usuario | null = null;
  menuVisible = false;
  viajes: Viaje[] = [];
  modalAbierto: string | null = null;
  animateClass: string = '';
  nombreUsuario: string = '';

  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  public map: any;
  public directionsService: any;
  public directionsDisplay: any;
  public start: any = "Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile";
  public end: any = "Pomaire";
  public autocompleteItems: any[] = [];
  distancia: string = '';
  duracion: string = '';
  
  constructor(private navCtrl: NavController, private platform: Platform, private zone: NgZone) {}


  ngOnInit() {
    this.getTheme();
    this.getSeccion();
  }

  getSeccion() {
    // Obtener la sesión desde LocalStorage
    const session = JSON.parse(localStorage.getItem('session') || '{}');

    // Verificar si la sesión es válida
    if (!session || !session.correo || !session.expiration) {
      this.navCtrl.navigateForward('/login');
      return;
    }

    if (session.expiration < new Date().getTime()) {
      localStorage.removeItem('session');
      this.navCtrl.navigateForward('/login');
      return;
    }

    // Obtener el correo del usuario desde la sesión
    const correo = session.correo;

    // Obtener la lista de usuarios desde el LocalStorage (base de datos simulada)
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    // Buscar el usuario por correo
    const usuarioEncontrado = users.find((user: Usuario) => user.correo === correo);

    // Si se encuentra el usuario, lo asignamos a la variable usuario
    if (usuarioEncontrado) {
      this.usuario = usuarioEncontrado;
    } else {
      console.error('Usuario no encontrado en la base de datos de users');
    }
    this.nombreUsuario = this.usuario?.correo?.split('@')[0] || 'Usuario no identificado';
  }

  initMap() {
    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer;

    const mapOptions = {
      zoom: 5,
      zoomControl: false,
      scaleControl: false,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.directionsDisplay.setMap(this.map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          const infoWindow = new google.maps.InfoWindow({
            position: pos,
            content: "Estas aquí.",
          });
          infoWindow.open(this.map);
          this.map.setCenter(pos);
        }
      );
    }

    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response: any, status: string) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
        const route = response.routes[0];
        const leg = route.legs[0];

        const distanceInKilometers = (leg.distance.value / 1000).toFixed(2);
        this.distancia = `${distanceInKilometers} km`;

        const durationInSeconds = leg.duration.value;
        const minutes = Math.floor(durationInSeconds / 60);
        const seconds = durationInSeconds % 60;
        const formattedDuration = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.duracion = `${formattedDuration}`;

        leg.steps.forEach((step: any, index: number) => {
          console.log(`Paso ${index + 1}: ${step.instructions}, Distancia: ${(step.distance.value / 1000).toFixed(2)} km, Tiempo: ${(step.duration.value / 60).toFixed(2)} minutos`);
        });
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  updateSearchResults() {
    const GoogleAutocomplete = new google.maps.places.AutocompleteService();
    if (this.end === '') {
      this.autocompleteItems = [];
      return;
    }

    GoogleAutocomplete.getPlacePredictions({ input: this.end }, (predictions: any, status: any) => {
      this.zone.run(() => {
        this.autocompleteItems = [];
        predictions.forEach((prediction: any) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  selectSearchResult(item: any) {
    this.end = item.description;
    this.autocompleteItems = [];
    this.initMap();
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
    return;
  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  cerrarSesion() {
    // borramos la sesión de LocalStorage
    localStorage.removeItem('session');
    this.navCtrl.navigateForward('/login');
    return;
  }

  mostrarDatos() {
    this.animateClass = 'animate-slide-in';
    this.modalAbierto = 'mostrarDatos';
    this.menuVisible = false;
  }

  modalIngresarViaje() {
    this.animateClass = 'animate-slide-in';
    this.modalAbierto = 'ingresoViaje';
    this.menuVisible = false;
    setTimeout(() => {
      this.initMap();
    }, 300);
  }
}
