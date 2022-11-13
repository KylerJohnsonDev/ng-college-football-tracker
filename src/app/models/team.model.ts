export interface Team {
  TeamID: number;
  Key: string;
  Active: boolean;
  School: string;
  Name: string;
  StadiumID: number;
  ApRank: number | null;
  Wins: number;
  Losses: number;
  ConferenceWins: number;
  ConferenceLosses: number;
  GlobalTeamID: number;
  CoachesRank: number | null;
  PlayoffRank: number | null;
  TeamLogoUrl: string;
  ConferenceID: number;
  Conference: string;
  ShortDisplayName: string;
  RankWeek: number | null;
  RankSeason: number | null;
  RankSeasonType: number | null;
}
