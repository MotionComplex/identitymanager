import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `
  <nav class="navbar navbar-toggleable-md navbar-light bg-faded navi">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" routerLink="/">{{pageTitle}}</a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li *ngFor="let route of routes"><a routerLink="{{route.path}}">{{route.data['title']}}</a></li>
      </ul>
      <span *ngIf="!isLoggedIn()"><span (click)="login()">login</span><button class="btn btn-default auth-btn btn-login" type="button" (click)="login()"></button></span>
      <span *ngIf="isLoggedIn()"><span (click)="login()">logout</span><button class="btn btn-default auth-btn btn-logout" type="button" (click)="logout()"></button></span>
    </div>
  </nav>
  `,
  styles:[`
    .navbar a {
      color: rgba(0, 0, 0, 0.8);
    }

    .auth-btn {
        background-color: transparent;
        background-repeat: no-repeat;
        height: 24px;
        width: 24px;
    }

    .btn-login {
        background-image: url("assets/img/login.png");
    }

    .btn-logout {
        background-image: url("assets/img/logout.png");
    }
  `]
})
export class NavigationStubComponent implements OnInit {
  private pageTitle: string;
  private routes = [
    {
      path: 'users',
      data: {
        title: 'Benutzer',
        relevantForNav: true
      }
    }
  ];

  constructor() {
    this.pageTitle = 'IdentityManager';
  }

  ngOnInit() {
  }

  private login() {
    console.log('trying to log in');
  }

  private logout() {
    console.log('trying to log out');
  }

  // TODO: Return state from service
  private isLoggedIn(): boolean {
    console.log('checking if is logged in');
    return false;
  }
}
