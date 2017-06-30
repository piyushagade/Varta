import { Component } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
  blogs = {};
  config = {
      'admin' : {
        name : 'Piyush Agade',
        title : '',
        organization : '', 
      },
      'dirs' : {
        images : '../../../assets/images/',
        css : '../../../assets/css/',
        js : '../../../assets/js/'
      }
    }

  constructor(){
    this.blogs = {
      all : [
        {
          'title' : 'Project First',
          'data' : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
          'link' : 'first.html',
          'image' : this.config.dirs.images + 'work_1.jpg',
          'author' : this.config.admin.name,
        },
        {
          'title' : 'Project Second',
          'data' : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
          'link' : 'second.html',
          'image' : this.config.dirs.images + 'work_1.jpg',
          'author' : this.config.admin.name,
        },
        {
          'title' : 'Project Third',
          'data' : 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia.',
          'link' : 'third.html',
          'image' : this.config.dirs.images + 'work_1.jpg',
          'author' : this.config.admin.name,
        },
      ]
    };    
  }
}
