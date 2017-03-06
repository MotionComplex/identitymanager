// angular imports
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

// 3rd-party libraries
import { Observable } from 'rxjs/Observable';

// custom services
import { WebConfigLoaderService } from '../web-config-loader/web-config-loader.service';

// models
import { User } from '../../models/users/user';
import { UserAccount } from '../../models/users/user-account';
import { Mandator } from '../../models/mandators/mandator';
import { WebConfig } from '../../models/web-config/web-config';

@Injectable()
export class UserService {
  private stsUrl = 'http://localhost:35854';
  private usersApi = '/api/useraccount';
  private mandatorsApi = '/api/mandator';
  private webConfig: WebConfig;
  private headers = new Headers();
  private options = new RequestOptions();

  constructor(private http: Http, 
              private webConfigLoaderService: WebConfigLoaderService) {
    this.headers.append('Authorization', 'Bearer ' + window.localStorage.getItem('access_token'));
    this.options.headers = this.headers;
  }

  // gets all users via http-get method
  public getUsers(): Observable<User[]> {
    return this.http.get(`${this.stsUrl}${this.usersApi}`, this.options)
      .map(this.mapData);
  }

  // gets a user account via http-get method by its uid
  public getUserAccount(uid: string): Observable<UserAccount> {
    return this.http.get(`${this.stsUrl}${this.usersApi}?uid=${uid}`, this.options)
      .map(this.mapData);
  }

  // creates a new user or updates an existing user account and links it with a mandator
  public addOrUpdateUser(mandatorUid, userAccount): Observable<Response> {
    const body = userAccount;
    const url = `${this.stsUrl}${this.usersApi}/${mandatorUid}`;
    return this.http.put(url, body);
  }

  // gets all mandators via http-get method
  public getMandators(): Observable<Mandator[]> {
    return this.http.get(`${this.stsUrl}${this.mandatorsApi}`, this.options)
      .map(this.mapData);
  }

  // parses the response-data to a json and returns it
  private mapData(res: Response) {
    const body = res.json();
    console.log('body');
    console.log(body);
    return body;
  }
}
