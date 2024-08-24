import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  sw: boolean = false;
  usuario: string = '';
  clave: string = '';

  constructor
  (
    private alert: AlertController,
    private router: Router
  ) {

  }

  login() {
    if (this.usuario == 'admin' && this.clave == 'admin') {
      this.router.navigate(['/home']);
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alert.create({
      header: 'Error',
      subHeader: 'Usuario o contraseña incorrectos',
      message: 'Por favor, verifique los datos ingresados',
      buttons: ['OK']
    });

    await alert.present();
  }

  

  ngOnInit() {
    return
  }

}
