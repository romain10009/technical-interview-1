import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users/users.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../interfaces/interfaces";
import {Observable} from "rxjs/Observable";
import {routerTransition} from "../router.animations";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [routerTransition()],
  host: {'[@routerTransition]': ''}
})
export class UserComponent implements OnInit {
  private user : Observable<User>;


  constructor(private usersService : UsersService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.usersService.getUser(params.id);
    });
  }
}
