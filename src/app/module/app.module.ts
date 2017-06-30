import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from '../components/root/app.component';
import { BlogsComponent } from '../components/blogs/blogs.component';
import { ThumbnailComponent } from '../components/thumbnail/thumbnail.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    ThumbnailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
