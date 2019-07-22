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
  public submitted : boolean = false;


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
    );

    this.loggedInUserId = this._authService.getLoggedInUser();


    this.routeSubscription = this._activatedRoute.params.subscribe(params => {
      this.shoppingId = params['shopId'];
      if(this.shoppingId){

        this.getShopValue(this.shoppingId);
      }
    });

  }

  get f() { return this.shoppingForm.controls; }

  onSubmit(){
    // console.log(this.shoppingForm.value);

    this.submitted = true;

    if(this.shoppingForm.invalid){
      return;
    }

    let {shopingDate, shopingTitle, qty, is_purchased, shop_id} = this.shoppingForm.value;

    if(is_purchased == ""){
      is_purchased = false;
    }else{
      is_purchased = true;
    }
    this.addShopingSubscription = this._shopService.addShoping({"user_id" : this.loggedInUserId, shopingDate, shopingTitle, qty, is_purchased, shop_id}) .pipe(first())
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

      this.shoppingForm.controls['shopingTitle'].setValue(this.shopData["shop_title"]);
      this.shoppingForm.controls['qty'].setValue(this.shopData["qty"]);
      this.shoppingForm.controls['shopingDate'].setValue(this.formatDate(this.shopData['shop_date']));
      this.shoppingForm.controls['shop_id'].setValue(this.shoppingId);




    }, error => {

    });
  }

  public formatDate(d){
    return new Date(d).toISOString().split('T')[0];
  }

  onDestroy(){

    this.routeSubscription.unsubscribe();
    this.addShopingSubscription.unsubscribe();
  }



}
