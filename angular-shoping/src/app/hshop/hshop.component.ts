import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-hshop',
  templateUrl: './hshop.component.html',
  styleUrls: ['./hshop.component.css']
})
export class HshopComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  redirectToAddShoping(){
    this._router.navigate(["home","add-shopping"])
  }

}
