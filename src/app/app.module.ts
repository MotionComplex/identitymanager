// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// Custom modules
import { AppRoutingModule } from './app-routing.module';

// 3rd-party services
import { OAuthService } from 'angular2-oauth2/oauth-service';

// Custom services
import { WebConfigLoaderService } from './services/web-config-loader/web-config-loader.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

// Custom components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { PageNotFoundComponent } from './components/error-pages/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/error-pages/unauthorized/unauthorized.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    UsersComponent,
    PageNotFoundComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    OAuthService,
    WebConfigLoaderService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
