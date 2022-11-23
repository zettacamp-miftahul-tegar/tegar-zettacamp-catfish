import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable < boolean | UrlTree > | Promise < boolean | UrlTree > | boolean | UrlTree {

    const userToken = localStorage.getItem('token');
    let user_type = JSON.parse(localStorage.getItem('user_type') !);
    
    let user_types = localStorage.getItem('user_type');

    if (userToken) {
      return true;
    } else {
      this.router.navigate(['homepage']);
      return false;
    }

    // if (userToken) {
    //   if (user_type == "admin") {
    //     return true;
    //   } else {
    //     this.router.navigate(['homepage']);
    //     return false;
    //   }
    // } else {
    //   this.router.navigate(['homepage']);
    //   return false;
    // }

  }

}
