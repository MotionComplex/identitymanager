import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { PageNotFoundComponent } from './components/error-pages/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/error-pages/unauthorized/unauthorized.component';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';

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
    path: 'unauthorized',
    component: UnauthorizedComponent,
    data: {
      title: 'Unauthorized',
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