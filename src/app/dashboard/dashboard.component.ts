import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultService } from '../shared/result.service';
import { OperationalResult } from '../shared/OperationResult';
import { IUser } from './User'
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import swal from 'sweetalert2';
import { AdminLocationServiceService } from "../shared/admin-location-service.service";
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  constructor(private _router: Router, private result: ResultService) { }
  name: string;
  status: boolean = false;
  isAdmin: boolean = false;
  IsAdmin: string;

  ngOnInit() {
    // this.result.cast.subscribe(status=>this.status=status);
    // this.result.cast1.subscribe(name=>this.name=name);
    // this.IsAdmin=this.result.getIsAdmin();
    // console.log(this.IsAdmin);

    this.name = localStorage.getItem('name');
    if (localStorage.getItem('status') == 'true')
      this.status = true;

    if (localStorage.getItem('isAdmin') == 'true')
      this.isAdmin = true;
  }


  logout() {
    localStorage.clear();
    this.status = false;
    this._router.navigate(["/"]);
  }

}
