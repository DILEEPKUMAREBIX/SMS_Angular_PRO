import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLogin: boolean = true;
  message: string = '';
  showMessage: boolean = false;
  loginForm: FormGroup;
  signUpForm: FormGroup;
  alertType: string;

  constructor(public service: LoginService, public router: Router, public fb: FormBuilder) {
    this.createForm()
  }

  ngOnInit() {
    // this.profileService.loggedInProfile = {};
    // this.profileService.isSubmitAction = false;
  }

  createForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  createSignUpForm() {
    this.signUpForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm: ['', [Validators.required]]
    }
    );
  }


  login() {
    if (this.loginForm.invalid) {
      return;
    }
    const body = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    this.service.login(body.toString()).subscribe(data => {
      window.sessionStorage.setItem('token', JSON.stringify(data));
      console.log(window.sessionStorage.getItem('token'));
      this.getUser();
    }, error => {
      this.setMessage(error['error']['error_description'], 'danger');
      this.loginForm.reset();
    });
  }

  getUser() {
    this.service.getUserByUserName(this.loginForm.controls.username.value).subscribe(
      (data) => {
        this.service.loggedInUser = data;
        console.log(this.service.loggedInUser);
        this.router.navigate(['/', 'dashboard']);
      },
      (error) => {
        // this.router.navigate(['/', 'profile']);
      });
  }

  validate() {
    // if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.signUpForm.value.email))) {
    //   this.setMessage("Please enter valid email address", 'danger');
    //   return false;
    // }
    // else if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(this.signUpForm.value.password))) {
    //   this.setMessage("Password should be atleast 8 characters long and should contain one number,one capital character and one special character", 'danger');
    //   return false;
    // }
    // else if (this.signUpForm.value.password != this.signUpForm.value.confirm) {
    //   this.setMessage("Passwords don't match", 'danger');
    //   return false;
    // }
    return true;
  }

  saveLogin() {
    this.clearMessage();
    if (this.validate()) {
      this.service.saveUser(this.signUpForm.value).subscribe(
        (data) => {
          this.createForm();
          this.isLogin = true;
          this.setMessage('You have registered successfully', 'success');
        },
        (error) => {
          // alert('error');
          this.setMessage(error.error.message, 'danger');
        }
      )
    }
  }

  swithclogin(value) {
    this.clearMessage();
    if (value === 'register') {
      this.createSignUpForm();
      this.isLogin = false;
    }
    else {
      this.createForm();
      this.isLogin = true;
    }
  }

  setMessage(message: string, type: string) {
    this.message = message;
    this.alertType = type;
    this.showMessage = true;
  }

  clearMessage() {
    this.message = '';
    this.showMessage = false;
  }

  get f() {
    if (this.signUpForm && this.signUpForm.controls)
      return this.signUpForm.controls;
  }
}
