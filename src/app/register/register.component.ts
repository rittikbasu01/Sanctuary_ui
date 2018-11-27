import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResultService } from '../shared/result.service';
import { OperationalResult } from '../shared/OperationResult';
import { IUser } from '../dashboard/User'
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  result: OperationalResult = {
    Status: false,
    Message: "",
    Result: null,
    StatusCode: null
  };
  constructor(private _result: ResultService, private _router: Router, private userService: UserService) { }

  public hide=true;

  ngOnInit() {
  }

  private user: IUser;
  userForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.pattern("[A-Z]{1}[a-zA-Z]*(?:(?:\. |[' ])[a-zA-Z]+)*"), Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required, Validators.pattern("[A-Z]{1}[a-zA-Z]*(?:(?:\. |[' ])[a-zA-Z]+)*"), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z]+[A-Za-z0-9._]*@[a-zA-Z0-9]+[.][a-zA-Z]+$')]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern('^[1-9][0-9]{9}$')]),
    companyName: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]{1}([a-zA-Z0-9]|[- @\\.#&!'])*$")]),
    password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&_*])(?=\\S+$).{8,}$"), Validators.minLength(8), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required]),
    securityQuestion: new FormControl('', Validators.required),
    securityAnswer: new FormControl('', [Validators.required, Validators.pattern("^[A-Za-z0-9]{1}([a-zA-Z0-9]|[-\\s@.&!'])*$")])

  }, this.passwordMatchValidator)

  passwordMatchValidator(g: FormGroup) {
    
    if (g.get('password').value === g.get('confirmPassword').value) {
      g.get('confirmPassword').setErrors(null);
      return null;
    }
    else
      g.get('confirmPassword').setErrors({ 'mismatch': true })

  }

  saveUser(userForm): void {
    this.user = new IUser();
    this.user.CompanyName = userForm.value.companyName;
    this.user.Email = userForm.value.email;
    this.user.FirstName = userForm.value.firstName;
    this.user.LastName = userForm.value.lastName;
    this.user.Password = userForm.value.password;
    this.user.PhoneNumber = userForm.value.phoneNumber;
    this.user.SecurityQuestion = userForm.value.securityQuestion;
    this.user.SecurityQuestionAnswer = userForm.value.securityAnswer;
    //console.log(this.user);
    swal({
      title: "Registering...",
      text:"please wait..!",
      showConfirmButton:false
    });
    swal.showLoading();
    this.userService.saveUser(this.user).subscribe(
      data => {
        this.result = data.valueOf();
        //console.log(this.result);

        if (this.result.Status) {
          swal({
            title: "Registered Successfully",
            text: "Login to continue...",
            timer: 2000,
            showConfirmButton: false
          });
        // localStorage.setItem("status", this.result.Status.toString());
          this._router.navigate(["/login"]);
        }
        else{
          swal.close();
        }
      },
      (error: any) => {
        swal.close();
        this._router.navigate(["/error"]);
      }
    );
  }

  resetForm(){
    this.result.Status = false;
    this.result.Result = null;
    this.result.StatusCode = null;
    this.result.Message = "";
    this.userForm.reset();
  }
}
