/**
 * AppDataService responsible for fetching application data from backend via fetch[*]-methods.
 * Storing data. Providing access to already fetched data via get[*]-methods.
 */

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import "rxjs/add/observable/of";
import "rxjs/add/observable/forkJoin";

import { ApiEndpoints } from '../api-endpoints';
import { HttpService } from '../services/http.service';
import { Profile } from '../interfaces/profile';

@Injectable()
export class AppDataService {
  profileData: Profile = null;
  chartsData: { graphData?: any, mapData?: any, chartData?: any } = {};

  constructor(private httpService: HttpService, private router: Router) {  }

  /* ----- fetching / getting profile data ----- */

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
          return Observable.of(null);
        }
      });
  }

  getProfileData(): Profile {
    return this.profileData;
  }

  /* ----- fetching / getting charts data ----- */
  /* !!!!!!!!! TODO create chartsData interfaces !!!!!!!!! */

  fetchChartsData(fromDate: Date, toDate: Date): Observable<any> { /* !!!!!!!!! TODO update types with new interfaces !!!!!!!!! */
    const params = { end_date: toDate.toISOString(), start_date: fromDate.toISOString() };

    return Observable.forkJoin(
      this.httpService.get(ApiEndpoints.GRAPH_DATA, { search: params }).map((res: Response) => res.json()),
      this.httpService.get(ApiEndpoints.MAP_DATA, { search: params }).map((res: Response) => res.json()),
      this.httpService.get(ApiEndpoints.CHART_DATA, { search: params }).map((res: Response) => res.json())
    ).map(data => {
      this.chartsData.graphData = data[0];
      this.chartsData.mapData = data[1];
      this.chartsData.chartData = data[2];
      return this.chartsData;
    });
  }

}
