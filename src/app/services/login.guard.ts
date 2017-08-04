import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private router:Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const ncToken:string = next.queryParams.token;

      if (ncToken) {
        localStorage.setItem('nctoken', ncToken);
        this.router.navigate(['']);
      } else {
        this.router.navigate(['error']);
        return false;
      }
  }
}
