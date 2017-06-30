import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from '../routers/app.router';

import { AppComponent } from '../components/root/app.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AddComponent } from '../components/add/add.component';
import { ArticlesComponent } from '../components/articles/articles.component';
import { ArticleComponent } from '../components/article/article.component';
import { ThumbnailComponent } from '../components/thumbnail/thumbnail.component';
import { ApiService } from '../services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ArticlesComponent,
    ArticleComponent,
    ThumbnailComponent,
    AddComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
