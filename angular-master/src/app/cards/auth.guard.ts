import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate() {
    window.alert("Cant acces this menu !")
    return false;
  }
}

// constructor(private router: Router) { }

// canActivate(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) {

// if (localStorage.getItem('token')) {
//   return true
// }

// this.router.navigate(["table/all-promos"], { queryParams: {returnUrl: state.url} })
// return false
// }
