// import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';

import {NgModule }from '@angular/core'; 
import {Routes, RouterModule }from '@angular/router'; 
import {AuthenticationService }from "./authenticate.service"; 
import {RegisterComponent }from './register/register.component'; 
import {LoginComponent }from './login/login.component'; 
import {HomeComponent }from "./home/home.component"; 
import {ProfileComponent }from "./profile/profile.component"; 
import {AuthGuardService }from './_guards/auth-guard.service'; 
import {ListbudgetsComponent }from './listbudgets/listbudgets.component'; 
import {ErrorComponent }from './error/error.component'; 
import {ModuleWithProviders }from "@angular/core"; 
import {LogoutComponent }from './logout/logout.component'; 
import {TrendsComponent }from './trends/trends.component'; 
import {STComponent }from './ST/ST.component'; 
import {HistoryComponent }from './history/history.component'; 
import {SearchComponent }from './search/search.component'; 
import {AboutComponent }from './about/about.component'; 
import {NewbudgetComponent }from './newbudget/newbudget.component'; 
import {BudgetdetailsComponent }from './budgetdetails/budgetdetails.component'; 
import {ChildetestComponent }from './childetest/childetest.component'; 
import {ParenttestComponent }from './parenttest/parenttest.component'; 
import {DataresolveService }from "./dataresolve.service"; 
import {BudgetlistresolveService }from "./budgetlistresolve.service"; 


// const rootModule: RootModule = {
//   states: [
//     {name:'default',url:'/',component:HomeComponent},
// {name:'login',url:'/login',component:LoginComponent},
// {name:'child',url:'/child',component:ChildetestComponent},
// {name:'parent',url:'/parent',component:ParenttestComponent},
// {name:'logout',url:'/logout',component:LogoutComponent},
// {name:'register',url:'/register',component:RegisterComponent},
// {name:'error',url:'/error',component:ErrorComponent},
// {name:'profile',url:'/profile',component:ProfileComponent},
// {name:'listbudgets',url:'/listbudgets',component:ListbudgetsComponent},
// {name:'trends',url:'/trends',component:TrendsComponent},
// {name:'history',url:'/history',component:HistoryComponent},
// {name:'search',url:'/search',component:SearchComponent},
// {name:'about',url:'/about',component:AboutComponent},
// {name:'ST',url:'/ST',component:STComponent},
// {name:'newbudget',url:'/newbudget',component:NewbudgetComponent},
// //{path:'details',component:BudgetdetailsComponent, resolve:{data:DataresolveService},canActivate:[AuthGuardService]},
//   ],
//   useHash: true
// };


const routes:Routes = [ {path:'', component:HomeComponent },  {path:'login', component:LoginComponent },  {path:'child', component:ChildetestComponent }, 
 {path:'parent', component:ParenttestComponent },  {path:'logout', component:LogoutComponent },  {path:'register', component:RegisterComponent }, 
  {path:'error', component:ErrorComponent },  {path:'profile', component:ProfileComponent, canActivate:[AuthGuardService] }, 
   {path:'listbudgets', component:ListbudgetsComponent, resolve: {data:BudgetlistresolveService }, canActivate:[AuthGuardService] },  
   {path:'trends', component:TrendsComponent, canActivate:[AuthGuardService] },  
   {path:'history', component:HistoryComponent, canActivate:[AuthGuardService] }, 
    {path:'search', component:SearchComponent, canActivate:[AuthGuardService] },  
    {path:'about', component:AboutComponent, canActivate:[AuthGuardService] },  
    {path:'ST', component:STComponent, canActivate:[AuthGuardService] },  
    {path:'newbudget', component:NewbudgetComponent, canActivate:[AuthGuardService] },
     {path:'details', component:BudgetdetailsComponent, resolve: {data:DataresolveService }, canActivate:[AuthGuardService] }, 
]; 

@NgModule( {
imports:[RouterModule.forRoot(routes,  {useHash:true})], 
exports:[RouterModule], 
// imports: [UIRouterModule.forRoot(rootModule)],
// exports: [UIRouterModule],
providers:[
    AuthGuardService, AuthenticationService, DataresolveService
  ]
})
export class AppRoutingModule {}

//export const routingModule: ModuleWithProviders = RouterModule.forRoot(routes);

