
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AdminroleService } from '../shared/adminrole.service';
import { OperationalResult } from '../shared/OperationResult';
import { IUser } from '../dashboard/User';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-role-settings',
  templateUrl: './admin-role-settings.component.html',
  styleUrls: ['./admin-role-settings.component.css']
})
export class AdminRoleSettingsComponent implements OnInit {
  public user: IUser;

  constructor(private adminrole: AdminroleService, private router: Router) { }

  result: OperationalResult = {
    Message: "",
    StatusCode: null,
    Status: false,
    Result: ""
  };

  result1: OperationalResult = {
    Message: "",
    StatusCode: null,
    Status: false,
    Result: ""
  };

  ngOnInit() {
  }
  addAdmin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z]+[A-Za-z0-9._]*@[a-zA-Z]+[.][a-zA-Z]+$')])
  });

  deleteAdmin = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z]+[A-Za-z0-9._]*@[a-zA-Z]+[.][a-zA-Z]+$')])
    }
  );

  // user: IUser = {
  //   Email : "",
  // };

  addAdminEmail(addAdmin) {
    swal({
      title: "Updating Admin",
      text: "please wait..!",
      showConfirmButton: false,
    });
    swal.showLoading();
    this.user = new IUser();
    this.user.Email = addAdmin.value.email;
    this.adminrole.addAdminEmail(this.user).subscribe(
      (data: any) => {
        this.result = data.valueOf();
        if (this.result.Status != null) {
          swal.close();
        }
      },
      (error: any) => {
        swal.close();
        this.router.navigate(["/error"]);
      }
    )
  }

  deleteAdminEmail(deleteAdmin) {
    swal({
      title: "Updating Admin",
      text: "please wait..!",
      showConfirmButton: false,
    });
    swal.showLoading();
    this.user = new IUser();
    this.user.Email = deleteAdmin.value.email;
    if (this.user.Email === localStorage.getItem('email')) {
      this.result1.Message = "Current loggedin Admin cannot be deleted";
    }
    else {
      this.adminrole.deleteAdminEmail(this.user).subscribe(
        (data: any) => {
          this.result1 = data.valueOf();
          if (this.result1.Status != null) {
            swal.close();
          }
        },

        (error: any) => {
          swal.close();
          this.router.navigate(["/error"]);
        }
      )
    }
  }
}
