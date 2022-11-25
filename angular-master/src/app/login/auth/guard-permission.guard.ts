import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardPermissionGuard implements CanActivate {

  constructor(
    private router: Router
  ) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const userToken = localStorage.getItem('token');
    let user_type = JSON.parse(localStorage.getItem('user_type') !);
    
    if (user_type == 'admin') {
      return true;
    } else {
      this.router.navigate(['homepage']);
      return false;
    }

  }
  
}
