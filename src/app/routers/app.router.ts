import {ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArticlesComponent } from '../components/articles/articles.component';
import { ArticleComponent } from '../components/article/article.component';

export const router: Routes = [
    { path: 'blogs', redirectTo: '', pathMatch: 'full' },
    { path: '', component: ArticlesComponent },
    { path: '**', component: ArticleComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);