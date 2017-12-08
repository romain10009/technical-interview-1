import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './user/user.component';
import {ApiService} from "./services/api/api.service";
import {UsersService} from "./services/users/users.service";
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    UserComponent,
    AppNavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
