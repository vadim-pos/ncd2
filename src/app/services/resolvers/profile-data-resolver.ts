import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../http.service';
import { ApiEndpoints } from '../../api-endpoints';

@Injectable()
export class ProfileDataResolver implements Resolve<any> {

  constructor(private httpService: HttpService) { }

  resolve(): Observable<any> {
    return this.httpService.get(ApiEndpoints.PROFILE_DATA).map((response: Response) => response.json());
  }

}
