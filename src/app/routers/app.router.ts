import {ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from '../components/articles/articles.component';
import { ArticleComponent } from '../components/article/article.component';
import { AddComponent } from '../components/add/add.component';
import { GetComponent } from '../components/get/get.component';
import { AdminComponent } from '../components/admin/admin.component';
import { LoginComponent } from '../components/login/login.component';
import { Four04Component } from '../components/404/404.component';

export const router: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'home', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'varta-key', component: GetComponent },

    { path: '404', component: Four04Component },

    { path: ':username', redirectTo: ':username/home', pathMatch: 'full' },
    { path: ':username/home', component: ArticlesComponent },
    { path: ':username/add', component: AddComponent },
    { path: ':username/varta-key', component: GetComponent },
    { path: ':username/admin', component: AdminComponent },
    { path: ':username/:article', component: ArticleComponent },
    { path: '**', component: ArticleComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);