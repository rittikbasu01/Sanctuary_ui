import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { OperationalResult } from './OperationResult';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IUser } from '../dashboard/User';

@Injectable()
export class AdminroleService {

  private adminroleAPI: string = "http://localhost:61938/User";
  //private adminroleAPI : string = "https://sanctuaryuibackdotnet.azurewebsites.net/User";
  //private adminroleAPI : string = "https://sanctuaryuibackdotnet.azurewebsites.net/User";

  constructor(public http: HttpClient) { }

  addAdminEmail(user: IUser): Observable<OperationalResult> {
  
    return this.http.put<OperationalResult>(this.adminroleAPI + "/addAdmin", user).catch(this.handleError);
  }

  deleteAdminEmail(user: IUser): Observable<OperationalResult> {

    return this.http.put<OperationalResult>(this.adminroleAPI + "/deleteAdmin",user).catch(this.handleError);

  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
}

}
