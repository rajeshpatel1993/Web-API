import { Component, OnInit } from '@angular/core';

import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {first} from "rxjs/internal/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public loginForm = new FormGroup({
  //   username: new FormControl(''),
  //   password: new FormControl(''),
  // });

  public loginForm : FormGroup;
  public submitted : boolean = false;
  constructor(private _authService: AuthService, private _router: Router, private _formBuilder : FormBuilder) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group(
      {
        username : ['', Validators.required],
        password: ['', Validators.required]
      }
    );


  }

  get f() { return this.loginForm.controls; }

  login(){
    this.submitted = true;

    if(this.loginForm.invalid){
      return;
    }
    const {username,password} = this.loginForm.value;

    this._authService.login({username,password}) .pipe(first())
      .subscribe(
        data => {
           this._router.navigate(["/home"]);
        },
        error => {
          // this.error = error;
          // this.loading = false;
        });
    // console.log(username);
  }

  redirectToSignup(){
    this._router.navigate(["/signup"]);
  }

}
