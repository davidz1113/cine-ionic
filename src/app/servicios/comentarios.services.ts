import { Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { Headers, Http } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ComentariosServices {

    url: string;
    headers: Headers;


    constructor(public localStorage: Storage, public http: Http) {
        this.headers = new Headers();
        this.headers.append('X-Parse-REST-API-Key', 'restAPIKey');
        this.headers.append('X-Parse-Master-Key', 'masterKey');
        this.headers.append('X-Parse-Application-id', 'Cine1');
        this.localStorage = new Storage(null);
    }


    obtenerComentarios(idUsuario: any) {
        this.url = `http://localhost:8080/cine/classes/comentarios?where={"iduser":"${idUsuario}"}`;
        return this.http.get(this.url, { headers: this.headers })
            .pipe(map(res => res.json()));
    }

    obtenerPeliculaPorId(idPelicula) {
        this.url = `http://localhost:8080/cine/classes/listapeliculas?where={"objectId":"${idPelicula}"}`;
        return this.http.get(this.url, { headers: this.headers })
            .pipe(map(res => res.json()));
    }


    editarComentario(comentarios: any) {
        const { objectId, titulo, comentario } = comentarios;

        this.url = `http://localhost:8080/cine/classes/comentarios/${objectId}`;
        return this.http.put(this.url, { titulo, comentario }, { headers: this.headers })
            .pipe(map(res => res.json()));
    }


    eliminarComentario(comentario) {
        this.url = `http://localhost:8080/cine/classes/comentarios/${comentario.objectId}`;
        return this.http.delete(this.url, { headers: this.headers })
            .pipe(map(res => res.json()));
    }

}