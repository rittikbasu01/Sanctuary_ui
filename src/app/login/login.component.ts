import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultService } from '../shared/result.service';
import { OperationalResult } from '../shared/OperationResult';
import { CookieService } from 'ngx-cookie-service';
import { IUser } from '../dashboard/User'
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import swal from 'sweetalert2';
import { error } from 'selenium-webdriver';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],

})
export class LoginComponent implements OnInit {

  constructor(private _result: ResultService, private _router: Router, private userService: UserService, private cookieService: CookieService) { }

  public hide=true;

  userId: string = "";
  userPassword: string = "";

  ngOnInit() {
    this.userId = this.cookieService.get('userId');
    this.userPassword = this.cookieService.get('userPassword');
  }

  userData: OperationalResult;
  status: string;
  login: boolean = false;

  public loginForm = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    rememberme: new FormControl()
  });

  public forgotPasswordForm = new FormGroup({
    forgotUserAccountEmail: new FormControl('', [Validators.required, Validators.email])
  });

  result: OperationalResult = {
    Status: false,
    Message: "",
    Result: null,
    StatusCode: null
  };

  forgotEmailResult: OperationalResult = {
    Status: false,
    Message: "",
    Result: null,
    StatusCode: null
  };

  showForgetPasswordForm: boolean = false;

  forgetPassword() {
    this.showForgetPasswordForm = !this.showForgetPasswordForm;
    this.forgotEmailResult.Status = false;
    this.forgotEmailResult.Result = null;
    this.forgotEmailResult.StatusCode = null;
    this.forgotEmailResult.Message = "";
    this.forgotPasswordForm.reset();
  }

  checked: boolean;
  loginUser(loginForm) {
    let rememberme = loginForm.value.rememberme;
    let email = loginForm.value.emailId;
    let password = loginForm.value.password;
    console.log(rememberme);
    swal({
      title: "Signing In...",
      text: "please wait..!",
      showConfirmButton: false,
    });
    swal.showLoading();
    this.userService.getUser(email, password).subscribe(
    
      data => {
        this.result = data.valueOf();
        if (this.result.Status) {
          this._result.setStatus(true);
          this._result.setName(this.result.Result.FirstName.toString());
          localStorage.setItem("email", this.result.Result.Email.toString());
          localStorage.setItem("name", this.result.Result.FirstName.toString());
          localStorage.setItem("status", this.result.Status.toString());
          if (rememberme) {
            this.cookieService.set('userId', this.result.Result.Email.toString());
            this.cookieService.set('userPassword', this.result.Result.Password.toString());
          }
          if (this.result.Result.IsAdmin) {
            localStorage.setItem("isAdmin", "true");
            this._result.setIsAdmin(true);
            this._router.navigate(["/admin"]);
            window.location.reload();
          } else {
            localStorage.setItem("isAdmin", "false");
            this._result.setIsAdmin(false);
            this._router.navigate(["/booking"]);
            window.location.reload();
          }

        }
        else {
          swal.close();
        }
      },
      (error: any) => {
        swal.close();
        this._router.navigate(["/error"]);
      }
    );
  }

  emailSend(forgotPasswordForm) {
    let email = forgotPasswordForm.value.forgotUserAccountEmail;
    //console.log(email);
    this.userService.sendEmail(email, "1").subscribe(
      data => {
        this.forgotEmailResult = data.valueOf();
        if (this.forgotEmailResult.Status) {
          swal("Password has been sent to " + email);
        }
        else {
          swal(email + " not registered.");
        }
      },
      (error: any) => {
        swal.close();
        this._router.navigate(["/error"]);
      }
    );
  }

}
