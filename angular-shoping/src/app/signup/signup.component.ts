import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {first} from "rxjs/internal/operators";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
  }


  signup(){
    const {username,password} = this.signupForm.value;

    this._authService.signup({username,password}) .pipe(first())
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


  redirectToLogin(){
    this._router.navigate(["/login"]);
  }


}
