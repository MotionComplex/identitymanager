import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { WebConfig } from '../../models/web-config/web-config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/';

@Injectable()
export class WebConfigLoaderService {

  constructor(private http: Http) { }

  public getWebConifg(): Observable<WebConfig> {
    return this.http.get('../../web.config.json').map(res => res.json())
  }
}
