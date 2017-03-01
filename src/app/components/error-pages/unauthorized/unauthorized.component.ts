// angular imports
import { Component, OnInit } from '@angular/core';

// 3rd-party services
import { OAuthService } from 'angular2-oauth2/oauth-service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.component.html',
  styleUrls: ['./unauthorized.component.css']
})
export class UnauthorizedComponent implements OnInit {
  private pageTitle: string = '401 - Unauthorized'
  private warnMessage: string = 'Um auf diese Resource zuzugreifen, müssen Sie autorisiert sein. Melden Sie sich hier an, um auf die angefragte Resource zuzugreifen:';

  constructor(private oauthService: OAuthService) { }

  private login() {
    this.oauthService.initImplicitFlow();
  }

  ngOnInit() {
  }
}
