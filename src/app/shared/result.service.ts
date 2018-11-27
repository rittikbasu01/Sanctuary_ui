import { Injectable } from '@angular/core';
import { IUser } from '../dashboard/User';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch'
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { OperationalResult } from './OperationResult';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';



@Injectable()
export class ResultService {

 private status=new BehaviorSubject<boolean>(new Boolean(localStorage.getItem("status")).valueOf());
 cast=this.status.asObservable();

 private name=new BehaviorSubject<string>(localStorage.getItem("name"));
 cast1=this.name.asObservable();

//  private isAdmin=new BehaviorSubject<boolean>(new Boolean(localStorage.getItem("isAdmin")).valueOf());
private IsAdmin:boolean
getIsAdmin(): string {
  return (localStorage.getItem("isAdmin"));
}
//  cast3=this.isAdmin.asObservable();

  constructor() { }

  setStatus(status){
    this.status.next(status);
  }

  setName(name){
    this.name.next(name);
  }

  setIsAdmin(isAdmin){
    this.IsAdmin=isAdmin;
  }
 
}
