import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PageNotFoundComponent } from './public/error-pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './public/register/register.component';
import { LoginComponent } from './public/login/login.component';
import { ResetComponent } from './public/reset/reset.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'reset',
    component: ResetComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('./modules/notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
