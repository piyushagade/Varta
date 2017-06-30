
import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable'
import * as config from '../config/config';

@Injectable()
export class GeocoderService{

    constructor(private _http: Http){}

    getArticles(){
        return this._http.get("http://" + config.constants.server.url + ":" + config.constants.server.port + "/api/" + '/atricles')
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }
}