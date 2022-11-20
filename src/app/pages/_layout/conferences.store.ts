import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Conference } from 'src/app/models/conference.model';
import { Team } from 'src/app/models/team.model';
import { ConferencesService } from './conferences.service';

export interface ConferencesState {
  conferences: Conference[];
  loading: boolean;
  error: string | null;
}

const initialState = {
  conferences: [],
  loading: false,
  error: null,
};

@Injectable()
export class ConferencesStore extends ComponentStore<ConferencesState> {
  constructor(private conferencesService: ConferencesService) {
    super({ ...initialState });
  }

  readonly conferencesState$: Observable<ConferencesState> = this.select(
    (state) => state
  );

  readonly loading$: Observable<boolean> = this.select(
    (state) => state.loading
  );

  readonly conferencesCount$: Observable<number> = this.select(
    (state) => state.conferences.length
  );

  readonly teams$: Observable<Team[]> = this.select((state) => {
    return state.conferences
      .map((conference) => conference.Teams)
      .flat()
      .sort((a, b) => a.School.localeCompare(b.School));
  });

  readonly teamCount$: Observable<number> = this.select(
    this.teams$,
    (teams) => teams.length
  );

  readonly layoutVM$ = this.select(
    this.conferencesCount$,
    this.teamCount$,
    (conferencesCount, teamsCount) => ({ conferencesCount, teamsCount })
  );

  readonly teamsVM$ = this.select(
    this.teams$,
    this.loading$,
    (teams, loading) => ({
      teams,
      loading,
    })
  );

  readonly teamsByConferenceVM$ = (conferenceId: number) => {
    return this.select(this.conferencesState$, (state) => {
      const conference = state.conferences.find(
        (conference) => conference.ConferenceID === conferenceId
      );
      return {
        conferenceName: conference?.Name,
        teams: conference?.Teams ?? [],
        totalCount: conference?.Teams?.length ?? 0,
        loading: state.loading,
        error: state.error,
      };
    });
  };

  ngrxOnStoreInit() {
    this.loadConferences();
  }

  readonly loadConferences = this.effect(() => {
    this.patchState({ loading: true });
    return this.conferencesService.fetchConferences().pipe(
      tapResponse(
        (conferences) => {
          return this.setState((state) => ({
            ...state,
            loading: false,
            conferences,
          }));
        },
        (error: HttpErrorResponse) => {
          return this.setState((state) => ({
            ...state,
            loading: false,
            error: error.message,
          }));
        }
      )
    );
  });
}
