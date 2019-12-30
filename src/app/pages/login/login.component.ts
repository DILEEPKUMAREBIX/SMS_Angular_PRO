import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpParams } from '@angular/common/http';
import { LoginService } from 'src/app/login/login.service';
declare var $: any;

@Component({
    selector: 'app-login-cmp',
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
    test: Date = new Date();
    private toggleButton: any;
    private sidebarVisible: boolean;
    private nativeElement: Node;
    isLogin: boolean = true;
    message: string = '';
    showMessage: boolean = false;
    loginForm: FormGroup;
    signUpForm: FormGroup;
    alertType: string;

    constructor(private element: ElementRef, public service: LoginService, public router: Router, public fb: FormBuilder) {
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

    ngOnInit() {
        var navbar: HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        const body = document.getElementsByTagName('body')[0];
        body.classList.add('login-page');
        body.classList.add('off-canvas-sidebar');
        const card = document.getElementsByClassName('card')[0];
        setTimeout(function () {
            // after 1000 ms we add the class animated to the login/register card
            card.classList.remove('card-hidden');
        }, 700);
    }
    sidebarToggle() {
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];
        var sidebar = document.getElementsByClassName('navbar-collapse')[0];
        if (this.sidebarVisible == false) {
            setTimeout(function () {
                toggleButton.classList.add('toggled');
            }, 500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
    }
    ngOnDestroy() {
        const body = document.getElementsByTagName('body')[0];
        body.classList.remove('login-page');
        body.classList.remove('off-canvas-sidebar');
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

    swithclogin(value) {
        this.clearMessage();
        if (value === 'register') {
            // this.createSignUpForm();
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
