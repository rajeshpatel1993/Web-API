import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/internal/operators";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signupForm : FormGroup;
  public submitted : boolean = false;
  constructor(private _authService: AuthService, private _router: Router, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this._formBuilder.group(
      {
        username : ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }


  get f() { return this.signupForm.controls; }

  signup(){

    this.submitted = true;

    if(this.signupForm.invalid){
      return;
    }

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
