import { Component } from '@angular/core';
import { Location } from '@angular/common';

import { Router } from '@angular/router';
import * as config from '../../config/config';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  providers: [
    ApiService
  ]
})
export class AddComponent {
  author;
  origin;
  dirs = config.constants.dirs;
  keyError = false;
  gallery = [
    'http://seodzen.ru/wp-content/uploads/images/550_3_5f702bcf18e8b244653462d7f0a5ce9c.jpg',
    'https://static1.squarespace.com/static/55393e52e4b045984a736948/t/5807a23b414fb58dd37bbc42/1476895300381/blog-header.jpg?format=2500w',
    'http://static.panoramio.com/photos/large/7744356.jpg',
    'http://images.shape.mdpcdn.com/sites/shape.com/files/styles/story_detail/public/story/800-weights-in-gym.jpg?itok=211L41z2-cup-instan-29388125-1-810x540.jpg',
    'http://siycommunications.com/wp-content/uploads/2016/10/blog-post-03.jpg',
    'https://www.incimages.com/uploaded_files/image/1940x900/software-computer-code-1940x900_35196.jpg',
    'https://i1.wp.com/thetempest.co/wp-content/uploads/2017/03/better-1.jpg?w=1024&ssl=1',
    'https://i2.wp.com/bayesianbodybuilding.com/wp-content/uploads/2016/09/dark_fitness_man.jpg?fit=1200%2C630&resize=350%2C200',
    'http://bunkiechamber.net/sites/default/files/Education.jpg',
    'https://fthmb.tqn.com/Lgw3IAIATCJUu-4SZBJjIe-TcJ8=/768x0/filters:no_upscale()/about/exercise-at-home-GettyImages-562611521-575b2baa3df78c98dc4580c1.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdt5sCu3p_goGXfYxsURHzdIYc-1GvhX2KhhV6LfluqSNEWvgO',
    'http://questions.ufl.edu/wp-content/uploads/2012/11/game1.jpg',
    'http://amppob.com/wp-content/uploads/2015/08/INTRO_bigstock-Laptop-with-coffee',
    'https://www.mequilibrium.com/wp-content/uploads/2015/01/iStock_000029849248Medium1.jpg',
    'http://cdn.publishyourarticles.net/wp-content/uploads/2015/06/library_pataskala_026.jpg',
    'http://www.aniwa.lk/wp-content/uploads/2017/01/Novelist-Dreams-aniwa-02.jpg',
    'http://jcpatriot.com/wp-content/uploads/2016/04/REAL-university-of-florida-pic-900x581.jpg',
    'http://runningmagazine.ca/wp-content/uploads/2016/02/Run-Comeback.jpg',
    'https://s-media-cache-ak0.pinimg.com/564x/ec/3a/03/ec3a03be2d2d77449a5888a61aca994c.jpg',
    'http://wearewildness.com/wp-content/uploads/2014/07/we-are-wildness-write-for-us-blogger-writing.png'
  ];
  imageGallery;

  public articleForm = this._fb.group({
      title: ["", Validators.compose([Validators.required, Validators.maxLength(35), Validators.minLength(6)])],
      introduction: ["", Validators.compose([Validators.required, Validators.maxLength(200), Validators.minLength(15)])],
      text: ["", Validators.compose([Validators.required, Validators.minLength(20)])],
      key: ["", Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(4)])],
      image: [""]
  });

  constructor(private _fb: FormBuilder, private _api: ApiService, private _r: Router, location: Location){
    this.author = config.constants.admin.name;
    this.origin = document.location.origin;
  }

  onNewArticleSubmit(event) {
    let data = this.articleForm.value;
    
    // Add some more information
    data.link = '/' + data.title.toLowerCase().replace(/\s/g, "-");    
    data.author = config.constants.admin.name;
    data.date = new Date().getTime();

    // Update data store
    this._api.addArticle(data).subscribe(
        res => {
          this.onPostArticle(res, data);
        },
        err => console.log(err.json().message)
    );    
  }

  onPostArticle(res, data){
    console.log(JSON.parse(res._body).status);
    
    if(JSON.parse(res._body).status == 'success') this._r.navigateByUrl(data.link); 
    else if(JSON.parse(res._body).status == 'key-error') this.keyError = true; 
  }

  setGalleryImage(url){
    this.imageGallery = url;
  }
}
