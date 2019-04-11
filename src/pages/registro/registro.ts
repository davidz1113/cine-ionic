import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User, UserServices } from '../../app/servicios/user.services';

/**
 * Generated class for the RegistroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {
  usuarioARegistrar: User = {
    username: "",
    password: "",
    phone: "",
    name: "",
    email: ""
  }

  confirmarContrasenia: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, public alertContrl: AlertController, private _userServices: UserServices) {
  }

  irALogin() {
    this.navCtrl.pop();
  }


  registrar() {
    if (this.usuarioARegistrar.password != this.confirmarContrasenia) {
      this.alertContrl.create({
        title: 'Error',
        message: 'Las contraseñas no coinciden',
        buttons: ['Aceptar']
      }).present();
      return;
    }

    this._userServices.registrarUsuario(this.usuarioARegistrar)
      .subscribe(
        response => {
          this.alertContrl.create({
            title: 'Usuario registrado',
            message: 'El usuario se ha registrado exitosamente en la aplicacion.' +
              'Regresa a la pagina de inicio de sesion para ingresar al Sistema',
            buttons: [{
              text: 'Inicia sesión',
              handler: () => {
                this.navCtrl.pop();
              }
            }]
          }).present();
        },
        error => {
          this.alertContrl.create({
            title: 'Error',
            message: error.text(),
            buttons: ['Aceptar']
          }).present();

        }
      );
  }


}
