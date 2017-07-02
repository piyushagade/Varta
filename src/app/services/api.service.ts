
import { Injectable } from '@angular/core';
import { Http, Jsonp, RequestOptions, Headers } from '@angular/http'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable'
import * as config from '../config/config';

@Injectable()
export class ApiService{
    blogs;

    constructor(private _http: Http){
    }

    getArticles(){
        return this._http.get('http://localhost:3000' + "/blog/" + config.constants.admin.username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    
    getArticle(page_id : string){
        return this._http.get('http://localhost:3000' + "/blog/" + config.constants.admin.username + '/' + page_id)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    
    addArticle(article){
        let key = article.key;
        let username = config.constants.admin.username;

        delete article.key;
        article.username = username;

        console.log([article, key][1]);
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post('http://localhost:3000' + "/blog/add/", [article, key], {
            headers: headers
            })
            
    }

    // Get availability of a username
    getUserAvailability(username : string){
        return this._http.get('http://localhost:3000' + "/user/check/" + username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    // Register a username
    registerUsername(username : string){
        return this._http.get('http://localhost:3000' + "/user/key/" + username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }
}