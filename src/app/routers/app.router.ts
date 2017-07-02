import {ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from '../components/articles/articles.component';
import { ArticleComponent } from '../components/article/article.component';
import { AddComponent } from '../components/add/add.component';
import { GetComponent } from '../components/get/get.component';

export const router: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: ArticlesComponent },
    { path: 'add', component: AddComponent },
    { path: 'varta-key', component: GetComponent },
    { path: '**', component: ArticleComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);