import { Component } from '@angular/core';
import * as config from '../../config/config';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent {
  blogs = {};

  constructor(){
    this.blogs = {
      all : [
        {
          'title' : 'Project First',
          'data' : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
          'link' : '/first',
          'image' : config.constants.dirs.images + 'work_1.jpg',
          'author' : config.constants.admin.name,
        },
        {
          'title' : 'Project Second',
          'data' : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
          'link' : '/first',
          'image' : config.constants.dirs.images + 'work_1.jpg',
          'author' : config.constants.admin.name,
        },
        {
          'title' : 'Project Third',
          'data' : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
          'link' : '/first',
          'image' : config.constants.dirs.images + 'work_1.jpg',
          'author' : config.constants.admin.name,
        },
      ]
    };    
  }
}
