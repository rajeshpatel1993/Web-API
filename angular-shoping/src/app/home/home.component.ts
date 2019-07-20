import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {ShopService} from "../services/shop.service";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public loggedInUserId;
  public getShopingSubscribe : Subscription;
  public shopings: any = [];
  constructor(private _router: Router, private _authService : AuthService, private _shopService : ShopService) { }

  ngOnInit() {

    this.loggedInUserId = this._authService.getLoggedInUser();
    this.getShopingList();
  }


  getShopingList(){

    this.getShopingSubscribe = this._shopService.getShoping(this.loggedInUserId).subscribe(data => {
      this.shopings = data;
      // console.log(data);
    }, error => {

    })

  }

  editShop(shopId : string){

     this._router.navigate(["home","edit-shopping"])
  }




}
