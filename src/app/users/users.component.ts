import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users/users.service";
import {Observable} from "rxjs/Observable";
import {share} from "rxjs/operators";
import {User} from "../interfaces/interfaces";
import {ActivatedRoute} from "@angular/router";
import {animate, style, transition, trigger, state, query, stagger} from "@angular/animations";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(500)
      ]),
      transition('* => void', [
        animate(500, style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('shrinkIn', [
      state('in', style({transform: 'scaleY(1)'})),
      transition('* => void', [
        animate(150, style({transform: 'scale(0)'}))
      ])
    ]),
    trigger('liAnimation', [
      transition('* => *', [
        query('li',style({ transform: 'translateX(-100%)'})),
        query('li',
          stagger('250ms', [
            animate('300ms', style({ transform: 'translateX(0)'}))
          ]))
      ])
    ])
  ]
})
export class UsersComponent implements OnInit {

  public usersData : Observable<{ users : [User], nextPageUrl: string, previousPageUrl : string}>;
  public page: string;
  public count: string;

  constructor(private usersService : UsersService, private route : ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.usersData = this.usersService.getUsers(params.link).pipe(share());
    });
  }
}
