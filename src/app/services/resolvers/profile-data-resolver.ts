import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../http.service';
import { ApiEndpointsService } from '../api-endpoints.service';

@Injectable()
export class ProfileDataResolver implements Resolve<any> {

  constructor(private httpService: HttpService, private endpoints: ApiEndpointsService) { }

  resolve(): Observable<any> {
    return this.httpService.get(this.endpoints.PROFILE_DATA).map((response: Response) => response.json());
  }

}
