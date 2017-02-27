// Angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

// 3rd-party modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Custom modules
import { AppRoutingModule } from './app-routing.module';

// 3rd-party services
import { OAuthService } from 'angular2-oauth2/oauth-service';

// Custom services
import { WebConfigLoaderService } from './services/web-config-loader/web-config-loader.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { GuidValidatorService } from './services/guid-validator/guid-validator.service';

// Custom components
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { PageNotFoundComponent } from './components/error-pages/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/error-pages/unauthorized/unauthorized.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { SaveChangesModalComponent } from './components/modals/save-changes-modal/save-changes-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    UsersComponent,
    PageNotFoundComponent,
    UnauthorizedComponent,
    UserDetailComponent,
    SaveChangesModalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  providers: [
    OAuthService,
    WebConfigLoaderService,
    AuthGuardService,
    GuidValidatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
