import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map} from "rxjs/operators";
import { Router } from "@angular/router";
import { UserDetails, TokenPayload, TokenReponse } from './authentication.model';
import { parse } from 'url';
import { jsonpCallbackContext } from '@angular/common/http/src/module';


@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {
private token:string;
  constructor(private http:HttpClient,private router:Router) {
    
   }
   private saveToken(token:string):void{
    localStorage.setItem('mean-token',token);
    this.token=this.token;
  }

  private getToken(){
    if (!this.token){
      this.token=localStorage.get('mean-token');
    }
    return this.token;
  }
  public logOut():void{
    this.token='';
    window.localStorage.removeItem('mean-token')
    this.router.navigateByUrl('/');
  }

  public getUserDetails():UserDetails{
    const token=this.getToken();
    let payLoad;
    if(token){
      payLoad=token.split('.')[1];
      payLoad=atob(payLoad);
      return JSON.parse(payLoad);
    }
    else{
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }
  private request(method: 'post' | 'get', type: 'login' | 'register' | 'profile', user ? : TokenPayload): Observable < any > {
    let base;
    if (method === 'post') {
      base = this.http.post(`/server/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, {
        headers: {
          Authorization: `Bearer ${this.getToken()}`
        }
      });
    }
    const request = base.pipe(map((data: TokenReponse) => {
      if (data.token) {
        this.saveToken(data.token);
      }
      return data;
    }));
    return request;
  }

  public register(user:TokenPayload):Observable<any>{
    return this.request('post','register',user);
  }

  public login(user:TokenPayload):Observable<any>{
    return this.request('get','login',user);
  }

  public profile():Observable<any>{
    return this.request('get','profile')
  }

}
