import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import _ from 'lodash';
import {User} from "../app/interfaces/interfaces";
import {Router} from "@angular/router";
import "rxjs/add/operator/delay";
import {delay} from "rxjs/operators";

/**
 * fake the api during development.
 */
@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  private users : Array<User> = [
    { name : 'John',
      id : '12345',
      avatarUrl : 'https://randomuser.me/api/portraits/men/82.jpg'},
    { name: 'Sarah',
      id : '12346',
      avatarUrl : 'https://randomuser.me/api/portraits/women/83.jpg'},
    {
      name : 'Emmanuel',
      id : '12348',
      avatarUrl : 'https://randomuser.me/api/portraits/men/3.jpg',
    },{ name : 'Nick',
      id : '12349',
      avatarUrl : 'https://randomuser.me/api/portraits/men/4.jpg'},
    { name: 'Johnny',
      id : '12350',
      avatarUrl : 'https://randomuser.me/api/portraits/men/23.jpg'}];


  constructor(private router : Router) {}

  getURLParameter(url,name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(url) || [null, ''])[1].replace(/\+/g, '%20')) || null;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let res : any = { body : {}, status : 200};

    let split = req.url.split('/');
    let id = split[split.length -1];
    if(req.method === 'POST'){
      let user = _.set(this.users,{id : id});
      _.set(user,req.params);
      res.body = user;
    }else if(req.method === 'GET' && ( this.getURLParameter(req.urlWithParams,'start') || req.urlWithParams === 'https://sub.domain.com/api/v1/users')){
      let start = parseInt(this.getURLParameter(req.urlWithParams,'start') || '0');
      let count = parseInt(this.getURLParameter(req.urlWithParams,'count') || '3');
      let hasMore = (0 < (this.users.length - (start + count)));
      let nextStart = start + count;
      res.body.users = this.users.slice(start,start+3);
      if(hasMore){
        res.body.nextPageUrl = `https://sub.domain.com/api/v1/users?start=${nextStart}&count=${count}`;
      }
      if(start > 0){
        res.body.previousPageUrl = `https://sub.domain.com/api/v1/users?start=${start - count}&count=${count}`;
      }
    }else if(req.method === 'GET' && (req.url.match(/.+users\/\d+$/))) { //users/12345
      res.body = _.find(this.users, {id: id});
    }

    return Observable.of(new HttpResponse(res)).pipe(delay(800)); //end request here.
  }
}
