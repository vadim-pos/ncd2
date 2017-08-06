import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth.service';
import { ApiEndpointsService } from '../api-endpoints.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private http: Http, private endpoints: ApiEndpointsService) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.userIsAuthenticated()) {
      console.log('token found');
      return true;
    } else {
      return false;
    }
  }
}
