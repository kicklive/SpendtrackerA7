import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,throwError,of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserDetails,TokenPayload,TokenResponse } from "./authentication.model";

// export interface UserDetails {
//   _id: string;
//   email: string;
//   name: string;
//   role:string;
//   exp: number;
//   iat: number;
// }

// interface TokenResponse {
//   token: string;
// }

// export interface TokenPayload {
//   email: string;
//   password: string;
//   name?: string;
//   role?:string;
// }

@Injectable()
export class AuthenticationService {
  private token: string;
  

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    //debugger;
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public getUsername():string{
    const user=this.getUserDetails();
    return user.name;
  }

  public isLoggedIn(): boolean {
    debugger;
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload): Observable<any> {
    let base;
    ///window.localStorage.removeItem('mean-token');
    //window.localStorage.removeItem('MY_SECRET');
    if (method === 'post') {
      base = this.http.post(`/api/${type}`, user);
    } else {
      base = this.http.get(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }
debugger;
    const request = base.pipe(
      map((data: TokenResponse) => {
        debugger;
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}