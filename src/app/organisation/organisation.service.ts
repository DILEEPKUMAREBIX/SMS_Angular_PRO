import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class OrganisationService {

    // url: string = 'http://sms-env.av2vpzbwvh.us-east-1.elasticbeanstalk.com/api/';
    url: string = 'http://localhost:8080/api/';

    constructor(private http: HttpClient) { }

    getAllOrganisations() {
        return this.http.get(this.url + 'getAllOrganisations?access_token='
            + JSON.parse(window.sessionStorage.getItem('token')).access_token);
        // return this.http.get(this.url + 'getAllOrganisations');
    }

    createOrganisation(grn: any) {
        return this.http.post(this.url + 'organisation?access_token='
            + JSON.parse(window.sessionStorage.getItem('token')).access_token, grn);
    }

    updateOrganisation(grn: any) {
        return this.http.put(this.url + 'organisation?access_token='
            + JSON.parse(window.sessionStorage.getItem('token')).access_token, grn);
    }

    deleteOrganisation(id) {
        return this.http.delete(this.url + 'organisation/' + id + '?access_token='
            + JSON.parse(window.sessionStorage.getItem('token')).access_token);
    }
}