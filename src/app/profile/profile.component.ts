import { Component, OnInit } from '@angular/core';
import { Console } from '@angular/core/src/console';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { OperationalResult } from '../shared/OperationResult';
import { UserService } from '../shared/user.service';
import { IUser } from '../dashboard/User';
import { Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import swal from 'sweetalert2';
import { ResultService } from '../shared/result.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: IUser;

  result: OperationalResult = {
    Status: false,
    Message: "",
    Result: null,
    StatusCode: null
  };

  constructor(private _result: ResultService, private _userServce: UserService, private _router: Router) { }

  firstName: string;
  lastName: string;
  email: string = localStorage.getItem("email");
  phone: string;
  companyName: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  isAdmin:boolean;
  loyaltyTier: number;
  membership: string;

  ngOnInit() {
    swal({
      title: "Profile Loading...",
      text: "please wait..!",
      showConfirmButton: false,
    });
    swal.showLoading();
    let emailId = localStorage.getItem("email");

    this._userServce.getUserforgotPassword(emailId).subscribe(
      data => {
        
        this.user = data.Result;
        this.firstName = this.user.FirstName;
        this.lastName = this.user.LastName;
        this.companyName = this.user.CompanyName;
        this.phone = this.user.PhoneNumber;
        this.oldPassword = this.user.Password;
        this.isAdmin=data.Result.IsAdmin;
        this.loyaltyTier=data.Result.LoyaltyTier;
        
        if(this.loyaltyTier==1)
            this.membership="";
        else if(this.loyaltyTier==2)
            this.membership="(Silver Member)";
        else if(this.loyaltyTier==3)
            this.membership="(Gold Member)";
        else if(this.loyaltyTier==4)
            this.membership="(Platinum Member)";


        swal.close();
      },
      (error: any) => {
        swal.close();
        this._router.navigate(["/error"]);
      }
    );
  }


  isSelected: boolean = false;
  check: boolean = true;
  compare: boolean = false;
  buttonText: string = "Change";

  OnButtonClick(): boolean {
    this.isSelected = !this.isSelected;
    this.buttonText = (this.isSelected ? "Hide" : "Change");
    //since page was getting redirected after clicking submit
    return false;
  }
  onSubmit(form: NgForm) {
    //console.log(form.value);

    // $('#password + .glyphicon').on('click', function() {
    //   $(this).toggleClass('glyphicon-eye-close').toggleClass('glyphicon-eye-open'); // toggle our classes for the eye icon
    //   $('#password').togglePassword(); // activate the hideShowPassword plugin
    // });


    this.user.FirstName = document.forms["myForm"]["FirstName"].value;
    this.user.LastName = document.forms["myForm"]["LastName"].value;
    this.user.CompanyName = document.forms["myForm"]["Company"].value;
    this.user.PhoneNumber = document.forms["myForm"]["Phone"].value;

    if (this.isSelected == true) {

      var tempOldPassword = document.forms["myForm"]["OldPassword"].value;
      var tempNewPassword = document.forms["myForm"]["NewPassword"].value;
      var tempConfirmPassword = document.forms["myForm"]["ConfirmPassword"].value;

      if (tempNewPassword == tempConfirmPassword && tempOldPassword == this.oldPassword) {
        this.user.Password = document.forms["myForm"]["ConfirmPassword"].value;
        swal({
          title: "Updating Profile and Password...",
          text: "Please wait..!",
          showConfirmButton: false
        });
        swal.showLoading();
        this._userServce.updateUser(this.user).subscribe(
          (data: any) => {
            this.result = data.valueOf();
            if (this.result.Status) {
              localStorage.clear();
              this._result.setStatus(false);
              swal({
                title: "Password has been Changed Successfully! ",
                text: "Please Login to Continue",
                timer:2000,
                showConfirmButton: false
              });
              this._router.navigate(["/login"]);
            }
            else{
              swal({
                title: "Password Updation Failed!",
                timer:2000,
                showConfirmButton: false
              });
            }
          },
          (error: any) => {
            swal.close();
            this._router.navigate(["/error"]);
          }
        );


        //window.location.reload();

      }
      if (tempOldPassword != this.oldPassword) {
        this.compare = true;
      }
      else {
        this.compare = false;
        this.check = false;
      }
    }
    else {
      swal({
        title: "Updating Profile...",
        text: "Please wait..!",
        showConfirmButton: false
      });
      swal.showLoading();
      this._userServce.updateUser(this.user).subscribe(
        (data:any) => {
          this.result = data.valueOf();
          if(this.result.Status){
            swal({
              title: "Profile Updated Successfully!",
              timer:2000,
              showConfirmButton: false
            });
            localStorage.setItem("name",this.user.FirstName);
            this._router.navigate(["/"]);
            window.location.reload();
          }
          else{
            swal({
              title: "Profile Updation Failed!",
              timer:2000,
              showConfirmButton: false
            });
          }
        },
        (error: any) => {
          swal.close();
          this._router.navigate(["/error"]);
        }

      );
     
    }

  }

}
