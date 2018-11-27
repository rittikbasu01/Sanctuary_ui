import { Injectable } from '@angular/core';
import { IUser } from '../dashboard/User';
import { Observable } from 'rxjs/Observable';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/catch'
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { OperationalResult } from './OperationResult';

@Injectable()
export class UserService
{
    //private userAPI : string = "http://localhost:61938/User";
    private userAPI : string = "https://sanctuaryuibackdotnet.azurewebsites.net/User";
    
    constructor(private http : HttpClient)
    {
        
    }

    getAllUser(): Observable<IUser> {
        return this.http.get<IUser>(this.userAPI + "/all").catch(this.handleError);
    }

    getUser(email: string, password: string): Observable<any> {
        debugger;
        return this.http.get<OperationalResult>(this.userAPI + "/login", { params: { email: email, password: password } }).catch(this.handleError);
    }

    getUserforgotPassword(email: string): Observable<OperationalResult> {
        return this.http.get<OperationalResult>(this.userAPI + "/forgotPassword", { params: { email: email } }).catch(this.handleError);
    }

    getResult(): Observable<OperationalResult> {
        return this.http.get<OperationalResult>(this.userAPI).catch(this.handleError);//.catch(this.handleError);
    }
    updateUser(user: IUser): Observable<OperationalResult> {
        let body = user;
        return this.http.put<OperationalResult>(this.userAPI + "/Update", body).catch(this.handleError);
    }
    sendEmail(email:string,key:string) : Observable<any>{

        return this.http.get(this.userAPI + "/sendEmail", { params : { email : email, key : key }}).catch(this.handleError);
    }

    saveUser(user: IUser): Observable<any> {
        let body = user;
        return this.http.post(this.userAPI + "/Create", body).catch(this.handleError);
    }

    deleteUser(id: string): Observable<any> {
        return this.http.delete(this.userAPI + "/delete", { params: { id: id } }).catch(this.handleError);
    }

    private handleError(err: HttpErrorResponse) {
        console.log(err.message);
        return Observable.throw(err.message);
    }
}