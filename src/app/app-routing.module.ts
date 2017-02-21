import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UsersComponent } from './components/users/users.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

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