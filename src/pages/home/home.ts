import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { UserServices, Peliculas } from '../../app/servicios/user.services';
import { Storage } from '@ionic/storage';
import { ComentariosPage } from '../comentarios/comentarios';

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
    private _userServices: UserServices,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {

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


  comentarPelicula(pelicula) {
    this.alertCtrl.create({
      title: "Añadir comentario",
      message: "Escribe lo que piensas sobre esta película",
      inputs: [
        {
          name: "titulo",
          placeholder: "Título",
        },
        {
          name: "comentario",
          placeholder: "Ingresa tu comentario",
        },
      ],
      buttons: [
        {
          text: "Cancelar"
        },
        {
          text: "Guardar",
          handler: data => {
            //editar en el servidor
            // console.log(pelicula);
            let loading = this.loadingCtrl.create({
              content: 'Agregando comentario'
            });
            loading.present();

            const { titulo, comentario } = data;
            const comentarios = {
              titulo, comentario, iduser: this.idUsuario, idpelicula: pelicula.objectId
            }

            this._userServices.agregarComentario(comentarios).subscribe(
              response => {
                loading.dismiss();
                this.toastCtrl.create({
                  message: 'El comentario se ha creado satisfactoriamente',
                  duration: 3000,
                  position: 'middle'
                }).present();
              },
              error => {
                loading.dismiss();
                this.toastCtrl.create({
                  message: 'Ha ocurrido un error intentelo de nuevo',
                  duration: 3000,
                  position: 'middle'
                }).present();


              }
            )
          }
        }
      ]
    }).present();
  }



  verComentarios() {
    this.navCtrl.push(ComentariosPage);
  }

}
