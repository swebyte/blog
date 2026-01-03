import { Routes } from '@angular/router';
import { BlogComponent } from './blog/blog';
import { ExperienceComponent } from './experience/experience';
import { AboutComponent } from './about/about';

export const routes: Routes = [
  { path: '', redirectTo: '/blog', pathMatch: 'full' },
  { path: 'blog', component: BlogComponent },
  { path: 'experience', component: ExperienceComponent },
  { path: 'about', component: AboutComponent },
];
