import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { ResultService } from './shared/result.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private _router: Router, private result: ResultService) { }
  canActivate() {
    if (localStorage.getItem("isAdmin") == "true") {
      return true;
    }
    else {
      this.result.setIsAdmin(false);
      this._router.navigate(["/"]);
    }
  }

}
