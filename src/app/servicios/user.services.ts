import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserServices {
    url: string;
    headers: Headers;


    constructor(public localStorage: Storage, public http: Http) {
        this.headers = new Headers();
        this.headers.append('X-Parse-REST-API-Key', 'restAPIKey');
        this.headers.append('X-Parse-Master-Key', 'masterKey');
        this.headers.append('X-Parse-Application-id', 'Cine1');
        this.localStorage = new Storage(null);
    }


    logearUsuario(username, password) {
        this.url = 'http://localhost:8080/cine/login?username=' + username + '&password=' + password;

        return this.http.get(this.url, { headers: this.headers }).pipe(map(res => res.json()));
    }


    registrarUsuario(usuarioARegistrar) {
        this.url = 'http://localhost:8080/cine/users';
        return this.http.post(this.url, usuarioARegistrar, { headers: this.headers }).pipe
            (map(res => res.json()));
    }


    obtenerTodasPeliculas() {
        this.url = 'http://localhost:8080/cine/classes/listapeliculas';
        return this.http.get(this.url, { headers: this.headers })
            .pipe(map(res => res.json()));
    }

    agregarComentario(comentario){
        this.url = 'http://localhost:8080/cine/classes/comentarios';
        return this.http.post(this.url, comentario , { headers: this.headers }).pipe(map(res => res.json()))

    }


}

export interface User {
    username: string;
    password: string;
    phone?: string;
    name?: string;
    email?: string;
}

export interface Peliculas {
    _id: string,
    titulo: string,
    imagen: string,
    categoria: string,
    numero_estrellas: number,
    favorito?: boolean
}