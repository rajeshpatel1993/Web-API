import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/internal/operators";
import {ShopService} from "../services/shop.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {Subscription} from "rxjs/index";

@Component({
  selector: 'app-shoping',
  templateUrl: './shoping.component.html',
  styleUrls: ['./shoping.component.css']
})
export class ShopingComponent implements OnInit {


  public shoppingForm : FormGroup;
  public loggedInUserId;
  public routeSubscription : Subscription;
  public addShopingSubscription : Subscription;
  public getShopSubscription: Subscription;
  public isEdit: boolean = false;
  public shoppingId: string;
  public shopData:any;

  constructor(private _activatedRoute: ActivatedRoute, private _formBuilder: FormBuilder , private _authService: AuthService, private _shopService : ShopService, private _router: Router) { }

  ngOnInit() {
    this.shoppingForm = this._formBuilder.group(
      {
        shopingDate : ['', Validators.required],
        shopingTitle: ['', Validators.required],
        qty: ['', Validators.required],
        is_purchased: ['', Validators.required],
        shop_id: ['']
      }
    )

    this.loggedInUserId = this._authService.getLoggedInUser();


    this.routeSubscription = this._activatedRoute.params.subscribe(params => {
      this.shoppingId = params['shopId'];
      if(this.shoppingId){

        this.getShopValue(this.shoppingId);
      }
    });

  }

  onSubmit(){
    let {shopingDate, shopingTitle, qty, is_purchased} = this.shoppingForm.value;

    if(is_purchased == ""){
      is_purchased = false;
    }else{
      is_purchased = true;
    }
    this.addShopingSubscription = this._shopService.addShoping({"user_id" : this.loggedInUserId, shopingDate, shopingTitle, qty, is_purchased}) .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
          this._router.navigate(["/home"]);
        },
        error => {
          // this.error = error;
          // this.loading = false;
        });
  }

  getShopValue(shopId){
    this.getShopSubscription = this._shopService.getShop(shopId,this.loggedInUserId).subscribe(data => {
      // console.log(data);
      this.isEdit = true;
      this.shopData = data;
      // console.log(this.shopData['shop_date']);


    }, error => {

    });
  }

  onDestroy(){

    this.routeSubscription.unsubscribe();
    this.addShopingSubscription.unsubscribe();
  }



}
