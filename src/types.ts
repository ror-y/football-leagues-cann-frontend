type TRecord = {
  draw: number;
  goalsAgainst: number;
  goalsFor: number;
  lose: number;
  matchsPlayed: number;
  win: number;
};

export type TTeam = {
  all: TRecord;
  away: TRecord;
  description: string | null;
  forme: string;
  goalsDiff: number;
  group: string;
  home: TRecord;
  lastUpdate: string;
  logo: string;
  points: number;
  rank: number;
  status: string;
  team_id: number;
  teamName: string;
};

export type TParsedTeam = Array<{
  name?: string;
  logo?: string;
  points: number;
  rank?: number;
}>;
