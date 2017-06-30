import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from '../routers/app.router';

import { AppComponent } from '../components/root/app.component';
import { BlogsComponent } from '../components/blogs/blogs.component';
import { ArticleComponent } from '../components/article/article.component';
import { ThumbnailComponent } from '../components/thumbnail/thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    ArticleComponent,
    ThumbnailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
