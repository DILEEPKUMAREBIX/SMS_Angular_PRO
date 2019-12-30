import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class LoginService {

    baseUrl: string = 'http://localhost:8080/';
    loggedInUser: any;
    usedLanguage: any = 'en';
    constructor(private http: HttpClient) { }

    login(loginPayload) {
        const headers = {
            'Authorization': 'Basic ' + btoa('devglan-client:devglan-secret'),
            'Content-type': 'application/x-www-form-urlencoded'
        }
        return this.http.post(this.baseUrl + 'oauth/token', loginPayload, { headers });
    }

    validate(user) {
        return this.http.post(this.baseUrl + 'login/login', user);
    }

    getUser(id) {
        return this.http.get(this.baseUrl + 'login/user/' + id);
    }

    getUserByUserName(username) {
        return this.http.get(this.baseUrl + 'login/username/' + username);
    }

    saveUser(loginUser) {
        return this.http.post(this.baseUrl + 'login/user/', loginUser);
    }

    getUsers() {
        return this.http.get(this.baseUrl + 'user?access_token=' + JSON.parse(window.sessionStorage.getItem('token')).access_token);
    }
}