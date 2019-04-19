import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { UserServices, Peliculas } from '../../app/servicios/user.services';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  peliculas: Peliculas[];
  idUsuario: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public localStorage: Storage,
    private _userServices: UserServices) {

    this.localStorage = new Storage(null);



    this.localStorage.get('idUsuario')
      .then((valor) => {
        this.idUsuario = valor;
        this.getPeliculas();
      })

  }


  getPeliculas(refresher?) {

    this._userServices.obtenerTodasPeliculas().subscribe(
      response => {
        this.peliculas = response.results;
        if (refresher) {
          refresher.complete();
        }
      },
      error => {
        this.alertCtrl.create({
          title: 'Error',
          message: 'Ha ocurrido un error al crear el trabajdor',
          buttons: ['Aceptar']
        }).present();
      })
  }


  ponerFavorito(pelicula) {
    pelicula.favorito = !pelicula.favorito;
  }



}
