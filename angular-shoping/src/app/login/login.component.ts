import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from "../services/auth.service";
import {first} from "rxjs/internal/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {



  }

  login(){
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
    console.log(username);
  }

  redirectToSignup(){
    this._router.navigate(["/signup"]);
  }

}
