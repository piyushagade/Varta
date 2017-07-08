
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

    
    getArticle(article_identifier, username){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/" + username + '/' + article_identifier)
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

    // Get key
    getKey(username){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/user/key/" + username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    // Verify key
    verifyKey(username, key){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/user/verify/" + username + '/' + key)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }

    // Reset key
    resetKey(email){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/user/reset/" + email)
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
                return Observable.throw(error)
            });
    }


    // Publish article
    publishArticle(id){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/publish/" + id)
            .map(response => {
                'done'
            })
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error)
            });
    }


    // Unpublish article
    unpublishArticle(id){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/unpublish/" + id)
            .map(response => {
                'done'
            })
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

    // Post comment
    postComment(data){        
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(config.constants.server.url + ':' + config.constants.server.port + "/blog/comment/add", data, { 
                headers: headers
            })
            
    }


    // Delete comment
    deleteComment(article_id, comment_id){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/comment/remove/" + article_id + '/' + comment_id)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error.json())
            });
    }


    // Toggle comment state
    toggleCommentsPublished(article_id, comment_id){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/comment/toggle/" + article_id + '/' + comment_id)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error)
            });
    }


    // Search articles
    searchArticles(username, str){
        return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/blog/search/" + username + '/' + str)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error)
            });
    }

    // Delete account
    deleteAccount(username){
         return this._http.get(config.constants.server.url + ':' + config.constants.server.port + "/user/remove/" + username)
            .map(response => response.json())
            .catch(error => {
                console.log("Error fetching JSON");
                return Observable.throw(error)
            });
    }

    // Upload backed up data
    uploadBackupFile(data){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this._http.post(config.constants.server.url + ':' + config.constants.server.port + "/user/upload/", data, { 
            headers: headers
        })
    }

}