import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './public/home/home.component';
import { PageNotFoundComponent } from './public/error-pages/page-not-found/page-not-found.component';
import { RegisterComponent } from './public/register/register.component';
import { LoginComponent } from './public/login/login.component';
import { ResetComponent } from './public/reset/reset.component';
import { AccessDeniedComponent } from './public/error-pages/access-denied/access-denied.component';
import { NotAuthorizedComponent } from './public/error-pages/not-authorized/not-authorized.component';
import { AuthenticationGuard } from './core/guards/authentication.guard';
import { AuthorizationGuard } from './core/guards/authorization.guard';
import { Role } from './shared/enums/role.enum';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: 'admin',
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: { roles: [Role.ADMIN] },
    loadChildren: () => import('./modules/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: 'notes',
    canActivate: [AuthenticationGuard, AuthorizationGuard],
    data: { roles: [Role.ADMIN, Role.MODERATOR, Role.USER] },
    loadChildren: () => import('./modules/notes/notes.module').then((m) => m.NotesModule)
  },
  {
    path: 'profile',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule)
  },
  { path: '403', component: AccessDeniedComponent, pathMatch: 'full' },
  { path: '401', component: NotAuthorizedComponent, pathMatch: 'full' },
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
