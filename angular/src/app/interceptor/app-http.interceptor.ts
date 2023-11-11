import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthServiceService

  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!request.url.includes("/login")&&!(request.url.includes("/offresPourStagiere"))&&(!request.url.includes("/Registre")))
    {
      let newRequest=request.clone(
        {
          headers:request.headers.set("Authorization","Bearer "+this.authService.AccesToken)
        }
      )
      return next.handle(newRequest);
    }
   
   else return next.handle(request);
  }
}
