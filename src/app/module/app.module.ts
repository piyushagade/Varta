import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routes } from '../routers/app.router';

import { AppComponent } from '../components/root/app.component';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { AddComponent } from '../components/add/add.component';
import { ArticlesComponent } from '../components/articles/articles.component';
import { ArticleComponent } from '../components/article/article.component';
import { ThumbnailComponent } from '../components/thumbnail/thumbnail.component';
import { GetComponent } from '../components/get/get.component';
import { AdminComponent } from '../components/admin/admin.component';
import { LoginComponent } from '../components/login/login.component';
import { Four04Component } from '../components/404/404.component';
import { ApiService } from '../services/api.service';
import { DashifyPipe } from '../pipes/dashify.pipe';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { LimitCharsPipe } from '../pipes/limitChars.pipe';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ArticlesComponent,
    ArticleComponent,
    ThumbnailComponent,
    GetComponent,
    AdminComponent,
    LoginComponent,
    AddComponent,
    Four04Component,
    DashifyPipe,
    CapitalizePipe,
    LimitCharsPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    MomentModule,
    routes,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
