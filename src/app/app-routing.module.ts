// agnular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

// components
import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { PageNotFoundComponent } from './components/error-pages/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/error-pages/unauthorized/unauthorized.component';

// custom services
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

// constant with all routes of this app
export const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home',
      relevantForNav: false
    }
  },
  {
    path: 'users',
    component: UsersComponent,
    data: {
      title: 'Benutzer',
      relevantForNav: true
    },
    canActivate: [
      AuthGuardService
    ]
  },
  {
    path: 'users/:uid',
    component: UserDetailComponent,
    data: {
      title: 'Benutzer Einzelansicht',
      relevantForNav: false
    },
    canActivate: [
      AuthGuardService
    ]
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: {
      title: 'Unauthorized',
      relevantForNav: false
    }
  },
  {
    path: 'notfound',
    component: PageNotFoundComponent,
    data: {
      title: 'Page not found',
      relevantForNav: false
    }
  },
  {
    path: '**', 
    component: PageNotFoundComponent,
    data: {
      title: 'Page Not Found',
      relevantForNav: false
    }
  }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}