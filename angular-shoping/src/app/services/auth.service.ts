import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../shared/models/user.model";
import {LOGIN_URL, SIGNUP_URL} from "../shared/utils/app.url";
import {map, tap} from "rxjs/internal/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) {

  }
  login(user:User) {
    return this.httpClient.post(LOGIN_URL, user).pipe(map(user => {
      if (user && user["token"]) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;

    }));
  }


  signup(user:User) {
    return this.httpClient.post(SIGNUP_URL, user).pipe(map(user => {
      if (user && user["token"]) {

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;

    }));
  }

  getLoggedInUser(){

    let loggedUser = JSON.parse(localStorage.getItem("currentUser"));
    return loggedUser["result"]._id;
  }

  logOut(){
    localStorage.removeItem('currentUser');

  }

}
