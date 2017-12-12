import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users/users.service";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../interfaces/interfaces";
import {Observable} from "rxjs/Observable";
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
  private userForm : FormGroup;
  private editMode : boolean = false;
  validation_messages = {
    'name' : [
      {type : 'required', message : 'Name is required'},
      {type : 'minlength', message : 'Name is too short, 2 caracters at least'}
    ]
  };

  constructor(private usersService : UsersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.user = this.usersService.getUser(params.id);

      //initialize form
      this.user.subscribe((user : User) => {
          this.userForm = new FormGroup({
            name : new FormControl(user.name, [Validators.required, Validators.minLength(2)])
          });
        });
    });
  }

  goBack(){
    this.router.navigate(['/users']);
  }

  saveUser(f : FormGroup){
    this.user.subscribe(user =>
    {
      if(f.value.name !== user.name){
        user.name = f.value.name;
      }
      this.usersService.saveUser(user).subscribe(res => {
        this.goBack();
      });
    });
  }

  startEdit(){
    this.editMode = true;
  }

  stopEdit(){
    this.editMode = false;
  }
}
