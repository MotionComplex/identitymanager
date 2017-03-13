// angular imports
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

// 3rd-party libraries
import 'rxjs/';
import { Observable } from 'rxjs/Observable';

// models
import { WebConfig } from '../../models/web-config/web-config';

@Injectable()
export class WebConfigLoaderService {

  constructor(private http: Http) { }

  // gets data of the web.config.json file via http-get method
  public getWebConifg(): Observable<WebConfig> {
    return this.http.get('../../assets/web.config.json').map(res => res.json());
    // return this.http.get('../../web.config.json').map(res => res.json());
  }
}
