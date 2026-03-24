export interface Player {
  name: string;
  score: number;
}

export interface Team {
  name: string;
  players: Player[];
  score: number;
  roundsPlayed: number;
}

export type WordCategory = "all" | "funny" | "animals" | "food" | "actions" | "objects" | "body" | "characters" | "clothing" | "sounds" | "situations" | "exclamations" | "random" | "adult";

export const CATEGORY_LABELS: Record<WordCategory, string> = {
  all: "All Categories",
  funny: "Funny & Silly",
  animals: "Animals",
  food: "Food & Drinks",
  actions: "Actions",
  objects: "Objects",
  body: "Body Related",
  characters: "Characters",
  clothing: "Clothing",
  sounds: "Sounds",
  situations: "Situations",
  exclamations: "Exclamations",
  random: "Random Hilarious",
  adult: "🔥 Adult 18+",
};

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
  selectedCategories: WordCategory[];
}

export const DEFAULT_GAME_STATE: GameState = {
  teams: [
    { name: "Team Alpha", players: [], score: 0, roundsPlayed: 0 },
    { name: "Team Beta", players: [], score: 0, roundsPlayed: 0 },
  ],
  currentTeamIndex: 0,
  currentPlayerIndex: 0,
  roundTime: 30,
  wordsPerTurn: 5,
  totalRounds: 4,
  currentRound: 1,
  phase: "setup",
  adultMode: false,
  selectedCategories: ["all"],
};
