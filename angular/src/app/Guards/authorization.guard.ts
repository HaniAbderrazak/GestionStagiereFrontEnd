import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class authorizationGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.roles.includes("ADMIN")) {
     
      return true;

    } else {
      console.log("**************")
      // Redirect to login or handle unauthenticated access
     this.router.navigateByUrl('unauthorized');
     return false;
    }
  }
}