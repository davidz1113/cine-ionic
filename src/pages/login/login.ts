import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { RegistroPage } from '../registro/registro';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { User, UserServices } from '../../app/servicios/user.services';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  usuarioALoguear: User = {
    username: '',
    password: ''
  }



  constructor(public localStorage: Storage, public navCtrl: NavController, public alertCtrl: AlertController, private _userServices: UserServices) {

  }


  irARegistro() {
    this.navCtrl.push(RegistroPage);
  }

  login() {
    if ((this.usuarioALoguear.username != "" && this.usuarioALoguear.password != "")) {
      this._userServices.logearUsuario(this.usuarioALoguear.username, this.usuarioALoguear.password)
        .subscribe(
          response => {
            this.localStorage.set('idUsuario', response.objectId)
              .then(() => {
                this.navCtrl.setRoot(HomePage);
              })
          },
          err => {
            this.alertCtrl.create({ title: "Error", message: "El usuario es incorrecto", buttons: [{ text: "Aceptar" }] })
              .present()
          }
        )

    } else {
      this.alertCtrl.create({ title: "Error", message: "Ningún campo puede ser vacío", buttons: [{ text: "Aceptar" }] })
        .present()
    }


  }

}
