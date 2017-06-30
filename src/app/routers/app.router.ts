import {ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogsComponent } from '../components/blogs/blogs.component';
import { ArticleComponent } from '../components/article/article.component';

export const router: Routes = [
    { path: 'blogs', redirectTo: '', pathMatch: 'full' },
    { path: '', component: BlogsComponent },
    { path: '**', component: ArticleComponent },
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);