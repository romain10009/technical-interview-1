import { Injectable } from '@angular/core';
import {User} from "../../interfaces/interfaces";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class UsersService {
  private url : string = 'https://sub.domain.com/api/v1/';

  constructor(private http : HttpClient) {}

  public getUsers(link? : string) : Observable<{users : [User], nextPageUrl : string, previousPageUrl: string}>{
    return this.http.get<{users : [User], nextPageUrl : string, previousPageUrl: string}>(link || (this.url + 'users'));
  }

  public getUser(id : string): Observable<User>{
    return this.http.get<{result :User}>(this.url + `users/${id}`).map(res => res.result);
  }

  public saveUser(id,user): Observable<User>{
    return this.http.post<User>(this.url + `users/${id}`, user);
  }
}
