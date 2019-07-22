import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {SignupComponent} from "./signup/signup.component";
import {ShopingComponent} from "./shoping/shoping.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HshopComponent} from "./hshop/hshop.component";
import {AuthGuard} from "./guards/auth.guard";



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HshopComponent, canActivate: [AuthGuard], children: [
      {path: '', component: HomeComponent},
      { path: 'add-shopping', component: ShopingComponent },
      {path : 'edit-shopping/:shopId', component: ShopingComponent}
    ] },
  { path: '**', component: PageNotFoundComponent }


];


@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
