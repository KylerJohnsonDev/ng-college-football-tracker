import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Conference } from 'src/app/models/conference.model';

@Injectable()
export class ConferencesService {
  private readonly url = `https://api.sportsdata.io/v3/cfb/scores/json/LeagueHierarchy`;

  constructor(private http: HttpClient) {}

  fetchConferences(): Observable<Conference[]> {
    return this.http.get<Conference[]>(this.url);
  }
}
