import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { Conference } from 'src/app/models/conference.model';
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
