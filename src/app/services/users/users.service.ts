import { Injectable } from '@angular/core';
import {ApiService} from "../api/api.service";

@Injectable()
export class UsersService {

  constructor(private api : ApiService) {}

  getUsers(){
    return this.api.get('users');
  }

  getUser(user){
    return this.api.get(`users/${user.id}`);
  }

  saveUser(user){
    return this.api.post(`users/${user.id}`, user);
  }

}
