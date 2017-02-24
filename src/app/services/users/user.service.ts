import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/users/user';
import { UserAccount } from '../../models/users/user-account';
import { Mandator } from '../../models/mandators/mandator';
import { WebConfigLoaderService } from '../web-config-loader/web-config-loader.service';

@Injectable()
export class UserService {
  private usersUrl: string = 'http://localhost:35854/api/useraccount';
  private mandatorsUrl: string = 'http://localhost:35854/api/mandator';
  private headers = new Headers();
  private options = new RequestOptions();

  constructor(private http: Http, private webConfigLoaderService: WebConfigLoaderService) { 
    this.headers.append("Authorization", "Bearer " + window.localStorage.getItem("access_token"));
    this.options.headers = this.headers;
  }

  public getUsers(): Observable<User[]> {
    return this.http.get(this.usersUrl, this.options)
      .map(res => res.json());
  }

  public getUserAccount(uid: string): Observable<UserAccount> {
    return this.http.get(`${this.usersUrl}?uid=${uid}`, this.options)
      .map(res => res.json())
  }

  public getMandators(): Observable<Mandator[]> {
    return this.http.get(this.mandatorsUrl, this.options)
      .map(res => res.json())
  }

  public addOrUpdateUser(mandatorUid, userAccount): Observable<Response>{
    let body = userAccount;
    let url = `${this.usersUrl}/${mandatorUid}`;
    return this.http.put(url, body);
  }
}
