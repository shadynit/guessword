export interface Player {
  name: string;
}

export interface Team {
  name: string;
  players: Player[];
  score: number;
}

export interface GameState {
  teams: [Team, Team];
  currentTeamIndex: 0 | 1;
  currentPlayerIndex: number;
  roundTime: 30 | 60 | 90;
  wordsPerTurn: 5 | 6;
  totalRounds: number;
  currentRound: number;
  phase: "setup" | "ready" | "playing" | "turnEnd" | "gameOver";
  adultMode: boolean;
}

export const DEFAULT_GAME_STATE: GameState = {
  teams: [
    { name: "Team Alpha", players: [], score: 0 },
    { name: "Team Beta", players: [], score: 0 },
  ],
  currentTeamIndex: 0,
  currentPlayerIndex: 0,
  roundTime: 30,
  wordsPerTurn: 5,
  totalRounds: 4,
  currentRound: 1,
  phase: "setup",
};