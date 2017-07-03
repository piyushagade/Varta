
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

    getPublishedArticles(username){

        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/published/" + username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    getArticles(username){

        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/" + username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    
    getArticle(page_id, username){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/" + username + '/' + page_id)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    
    addArticle(article, username){
        let key = article.key;
        delete article.key;
        article.username = username;

        console.log(username);
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(config.constants.server.url + ':' + config.constants.server.port + "/blog/add/", [article, key], {
                headers: headers
            })
            
    }

    // Get availability of a username
    getUserAvailability(username : string){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/user/check/" + username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    // Register a username
    getKey(username){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/user/key/" + username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }
    
    // Register a username
    registerUsername(data){        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(config.constants.server.url + ':' + config.constants.server.port + "/user/register", data, { 
                headers: headers
            })
            
    }
    
    // Update a username
    updateUsername(data){        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(config.constants.server.url + ':' + config.constants.server.port + "/user/update", data, { 
                headers: headers
            })
            
    }


    // Get user data
    getUserData(username){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/user/get/" + username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }


    // Publish article
    publishArticle(id){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/publish/" + id)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }


    // Unpublish article
    unpublishArticle(id){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/unpublish/" + id)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }


    // Delete article
    deleteArticle(id){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/remove/" + id)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }
}