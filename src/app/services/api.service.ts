
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
        return this._http.get('http://localhost:3000' + "/blog/")
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    
    getArticle(page_id : string){
        return this._http.get('http://localhost:3000' + "/blog/" + page_id)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    
    addArticle(article){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post('http://localhost:3000' + "/blog/add", article, {
            headers: headers
            })
            
    }
}