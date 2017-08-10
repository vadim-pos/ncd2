import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { HttpService } from '../http.service';
import { AppDataService } from '../app-data.service';
import { Profile } from '../../interfaces/profile';

@Injectable()
export class ProfileDataResolver implements Resolve<any> {

  constructor(private appDataService: AppDataService) { }

  resolve(): Observable<Profile> {
    return this.appDataService.fetchProfileData();
  }

}
