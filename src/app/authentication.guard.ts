import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router} from '@angular/router';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private _router:Router) { }
  canActivate(){
    if(localStorage.getItem("isAdmin")=="false")
      return true; 
    else
    this._router.navigate(["/"]);    
  }

}
