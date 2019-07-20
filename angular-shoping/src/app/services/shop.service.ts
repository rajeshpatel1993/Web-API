import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/internal/operators";
import {ADD_SHOP_URL, GET_S_URL, GET_SHOP_URL, LOGIN_URL} from "../shared/utils/app.url";
import {Shop} from "../shared/models/shop.model";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private httpClient: HttpClient) { }


  addShoping(shop:Shop) {
    return this.httpClient.post(ADD_SHOP_URL, shop).pipe(map(shop => {

      return shop;

    }));
  }

  getShoping(user_id) {
    return this.httpClient.get(GET_SHOP_URL+"?userId="+user_id).pipe(map(shop => {
      return shop;

    }));
  }

  getShop(shopId, user_id) {
    return this.httpClient.get(GET_S_URL+"?userId="+user_id+"&shopId="+shopId).pipe(map(shop => {
      return shop;

    }));
  }

}
