import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {
  private pageTitle: string = '404 - Page not found';
  private warnMessage: string = 'Die Seite, welche Sie angefragt haben, wurde nicht gefunden.';

  constructor() { }

  ngOnInit() {
  }

}
