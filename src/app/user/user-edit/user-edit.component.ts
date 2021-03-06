import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {User} from "../../interfaces/interfaces";
import {Observable} from "rxjs/Observable";
import {UsersService} from "../../services/users/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import _ from "lodash";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user : Observable<User>;
  private userForm : FormGroup;
  private id : string;
  validation_messages = {
    'name' : [
      {type : 'required', message : 'Name is required'},
      {type : 'minlength', message : 'Name is too short, 2 caracters at least'}
    ]
  };


  constructor(private usersService : UsersService, private router : Router, private route : ActivatedRoute, private location : Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.usersService.getUser(params.id);
      this.id = params.id;

      //initialize form
      this.user.subscribe((user : User) => {
        this.userForm = new FormGroup({
          name : new FormControl(user.name, [Validators.required, Validators.minLength(2)])
        });
      });
    });
  }

  canDeactivate(): boolean{
    return !this.userForm.get('name').dirty || confirm('Discard changes made?');
  }

  saveUser(f : FormGroup){
    this.user.subscribe(user => {
      this.usersService.saveUser(this.id, _.extend(user,f.value))
        .subscribe(res => {
          f.reset();
          this.router.navigate(['users', this.id])
        })
    });
  }
}
