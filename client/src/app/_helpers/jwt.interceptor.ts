import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        debugger;
        //let currentUser=JSON.parse(localStorage.getItem('mean-token'));
        let currentUser=localStorage.getItem('mean-token');
        if(currentUser!=''){

       // if(currentUser && currentUser.token){
            request=request.clone({
                setHeaders:{
                    //Authorization: `Bearer ${currentUser.token}`
                    Authorization: `Bearer ${currentUser}`
                }
            });
            
        }
        return next.handle(request);
    }
    


}