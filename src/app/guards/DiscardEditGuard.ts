import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {UserEditComponent} from "../user/user-edit/user-edit.component";

export class DiscardEditGuard implements CanDeactivate<UserEditComponent>{

  constructor(){}

  canDeactivate(component: UserEditComponent,
                route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): boolean{
    return component.canDeactivate();
  }
}
