/**
 * AppDataService responsible for fetching application data from backend via fetch[*]-methods.
 * Storing data. Providing access to this data via fetch[*]-methods.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { ApiEndpoints } from '../api-endpoints';
import { HttpService } from '../services/http.service';
import { Profile } from '../interfaces/profile';

@Injectable()
export class AppDataService {
  profileData: Profile = null;

  constructor(private httpService: HttpService, private router: Router) {  }

  fetchProfileData(): Observable<Profile> | null {
    return this.httpService.get(ApiEndpoints.PROFILE_DATA)
      .map((res: Response) => {
        const profileData = res.json();
        this.profileData = profileData;
        return profileData;
      })
      .catch((err: Response) => {
        // redirect if user was not authenticated
        if (err.status === 401 || err.status === 403) {
          this.router.navigate(['/error']);
          return null;
        }
      });
  }

  getProfileData(): Profile {
    return this.profileData;
  }

}
