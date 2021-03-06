import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardspGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isLoggedIn()) {
      return true;
    }

    this.router.navigateByUrl('/splogin');
    return false;
  }

  public isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedInSP') === 'true') {
      status = true;
    } else {
      status = false;
    }
    return status;
  }
}
