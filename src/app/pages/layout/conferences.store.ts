import {
  createActionGroup,
  emptyProps,
  props,
  createFeature,
  createReducer,
  on,
  Action,
} from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { OnInitEffects, createEffect, Actions, ofType } from '@ngrx/effects';
import { Conference } from 'src/app/models/conference.model';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
import { ConferencesService } from './conferences.service';

export const conferencseEffectsActions = createActionGroup({
  source: 'Conferences Effects',
  events: {
    'fetch conferences': emptyProps(),
    'fetch conferences success': props<{ conferences: Conference[] }>(),
    'fetch conferences error': emptyProps(),
  },
});

export interface ConferencesState extends EntityState<Conference> {
  loading: boolean;
  error: string | null;
}

function selectId(conference: Conference): number {
  return conference.ConferenceID;
}

function sortByNameDesc(a: Conference, b: Conference) {
  return a.ConferenceName.localeCompare(b.ConferenceName);
}

const adapter = createEntityAdapter<Conference>({
  selectId,
  sortComparer: sortByNameDesc,
});

const initialState: ConferencesState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const conferencesFeature = createFeature({
  name: `teams_by_conference`,
  reducer: createReducer(
    initialState,
    on(conferencseEffectsActions.fetchConferences, (state) => ({
      ...state,
      loading: true,
    })),
    on(
      conferencseEffectsActions.fetchConferencesSuccess,
      (state, { conferences }) => {
        return adapter.setMany(conferences, {
          ...state,
          loading: false,
          error: null,
        });
      }
    ),
    on(conferencseEffectsActions.fetchConferencesError, (state) => ({
      ...state,
      loading: false,
      error: `Unable to load NCAA football conferences. Please try again later.`,
    }))
  ),
});

const { selectAll } = adapter.getSelectors();

const { selectLoading, selectError } = conferencesFeature;

export const conferencesSelectors = {
  selectConferences: selectAll,
  selectLoading,
  selectError,
};

@Injectable()
export class ConferencesEffects implements OnInitEffects {
  ngrxOnInitEffects(): Action {
    return conferencseEffectsActions.fetchConferences();
  }

  fetchConferences$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(conferencseEffectsActions.fetchConferences),
      switchMap(() =>
        this.conferencesService.fetchConferences().pipe(
          map((conferences) =>
            conferencseEffectsActions.fetchConferencesSuccess({ conferences })
          ),
          catchError((error) => {
            console.error(error);
            return of(conferencseEffectsActions.fetchConferencesError());
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private conferencesService: ConferencesService
  ) {}
}
