import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ComentariosServices } from '../../app/servicios/comentarios.services';

@Component({
    selector: 'page-comentarios',
    templateUrl: 'comentarios.html'
})
export class ComentariosPage implements OnInit {

    ngOnInit(): void {
    }


    idUsuario: any;
    comentarios: any[] = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public localStorage: Storage,
        private _comentariosServices: ComentariosServices,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
    ) {

        this.localStorage = new Storage(null);



        this.localStorage.get('idUsuario')
            .then((valor) => {
                this.idUsuario = valor;
                this.getComentarios();

            })

    }


    getComentarios(refresher?) {
        this._comentariosServices.obtenerComentarios(this.idUsuario).subscribe(
            response => {
                let comentarios = response.results;
                comentarios.map(
                    (comentario) => {
                        comentario.pelicula = {};
                        this._comentariosServices.obtenerPeliculaPorId(comentario.idpelicula).subscribe(
                            response => {
                                comentario.pelicula = response.results[0];
                                this.comentarios = comentarios;
                            },
                            error => {

                            }
                        )
                    }
                );
                // console.log(this.comentarios);
                if (refresher) {
                    refresher.complete();
                }
            },
            error => {
                this.alertCtrl.create({
                    title: 'Error',
                    message: 'Ha ocurrido un error al consultar los comentarios',
                    buttons: ['Aceptar']
                }).present();
            }
        )
    }


    editarComentario(comentario) {
        this.alertCtrl.create({
            title: "Añadir comentario",
            message: "Escribe lo que piensas sobre esta película",
            inputs: [
                {
                    name: "titulo",
                    placeholder: "Título",
                    value: comentario.titulo
                },
                {
                    name: "comentario",
                    placeholder: "Ingresa tu comentario",
                    value: comentario.comentario
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
                            content: 'Editando comentario'
                        });
                        loading.present();

                        const { titulo } = data;
                        const comentarios = {
                            objectId: comentario.objectId, titulo, comentario: data.comentario
                        }

                        this._comentariosServices.editarComentario(comentarios).subscribe(
                            response => {
                                loading.dismiss();
                                this.toastCtrl.create({
                                    message: 'El comentario se ha editado satisfactoriamente',
                                    duration: 3000,
                                    position: 'middle'
                                }).present();
                                this.getComentarios();

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


    eliminarComentario(comentario) {
        this.alertCtrl.create({
            title: 'Eliminar comentario',
            message: '¿Esta seguro de eliminar este comentario?',
            buttons: [
                { text: 'No' },
                {
                    text: 'Si',
                    handler: () => {
                        this._comentariosServices.eliminarComentario(comentario).subscribe(
                            response => {
                                this.toastCtrl.create({
                                    message: 'El comentario se han ELIMINADO satisfactoriamente',
                                    duration: 3000,
                                    position: 'middle'
                                }).present();
                                this.getComentarios();
                            },
                            error => {
                                this.toastCtrl.create({
                                    message: 'Ha ocurrido un error intentelo de nuevo',
                                    duration: 3000,
                                    position: 'middle'
                                }).present();
                            }

                        );
                    }

                }
            ]
        }).present();
    }
}