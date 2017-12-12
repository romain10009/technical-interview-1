import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {UserComponent} from "./user/user.component";
import {HomeComponent} from "./home/home.component";
import {DiscardEditGuard} from "./guards/DiscardEditGuard";
import {UserEditComponent} from "./user/user-edit/user-edit.component";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'user/:id',
    component: UserComponent,
  },
  {
    path: 'user/:id/edit',
    component: UserEditComponent,
    canDeactivate: [DiscardEditGuard],
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
