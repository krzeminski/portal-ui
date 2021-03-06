import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './public/home/home.component';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { ResetComponent } from './public/reset/reset.component';
import { PageNotFoundComponent } from './public/error-pages/page-not-found/page-not-found.component';
import { AccessDeniedComponent } from './public/error-pages/access-denied/access-denied.component';
import { NotAuthorizedComponent } from './public/error-pages/not-authorized/not-authorized.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { HeadersInterceptor } from './core/interceptors/headers.interceptor';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    PageNotFoundComponent,
    AccessDeniedComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    BrowserAnimationsModule,
    NgbModule,
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
