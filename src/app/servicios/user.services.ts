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
        this.headers.append('X-Parse-Application-id', 'Lista1');
        this.localStorage = new Storage(null);
    }


    logearUsuario(username, password) {
        this.url = 'http://localhost:8080/lista/login?username=' + username + '&password=' + password;

        return this.http.get(this.url, { headers: this.headers }).pipe(map(res => res.json()));
    }


}

export interface User {
    username: string;
    password: string;
    name?: string;
    email?: string;
}