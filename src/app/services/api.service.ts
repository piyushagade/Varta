
import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http'
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable'
import * as config from '../config/config';

@Injectable()
export class ApiService{
    blogs = {};

    constructor(private _http: Http){
        this.blogs = {
                
            404 : {
                'title' : 'error',
                'data' : '404',
                'link' : '/404',
                'image' : '',
                'author' : config.constants.admin.name,
                'date' : '',
            },
            
            all : [
                {
                'title' : 'Project First',
                'introduction' : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
                'text' :
                    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
                'tags' : [
                    'Tag',
                    'Tag', 
                    'Tag'
                ],
                'link' : '/first',
                'image' : config.constants.dirs.images + 'work_1.jpg',
                'author' : config.constants.admin.name,
                'date' : '1498857201588',
                },
                {
                'title' : 'Project Second',
                'introduction' : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
                'text' :
                    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
                'tags' : [
                    'Tag',
                    'Tag', 
                    'Tag'
                ],
                'link' : '/second',
                'image' : config.constants.dirs.images + 'work_1.jpg',
                'author' : config.constants.admin.name,
                'date' : '1498257201588',
                },
                {
                'title' : 'Project Third',
                'introduction' : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
                'text' :
                    'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
                'tags' : [
                    'Tag',
                    'Tag', 
                    'Tag'
                ],
                'link' : '/third',
                'image' : config.constants.dirs.images + 'work_1.jpg',
                'author' : config.constants.admin.name,
                'date' : '1298857601588',
                },
            ],
        };    

    }

    getArticles(){
        return this.blogs;
        // return this._http.get("http://" + config.constants.server.url + ":" + config.constants.server.port + "/api/" + '/atricles')
        //     .map(response => response.json())
        //     .catch(error => {
        //         console.log("Error fetching JSON");
        //         return Observable.throw(error.json())
        //     });
    }

    
    getArticle(page_id : string){
        for(let article of this.blogs['all']){
            if(article.link.substring(1) == page_id){
                return article;
            }
        }
        return this.blogs['404'];
    }

    
    addArticle(article){
        this.blogs['all'].push(article);
    }
}