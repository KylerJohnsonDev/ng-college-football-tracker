import { Team } from './team.model';

export interface Conference {
  ConferenceID: number;
  Name: string;
  ConferenceName: string;
  DivisionName: null | string;
  Teams: Team[];
}
