import { useState, useCallback, useEffect } from "react";
import { GameState, DEFAULT_GAME_STATE } from "@/lib/gameTypes";
import { resetWords } from "@/lib/words";
import GameSetup from "@/components/GameSetup";
import ReadyScreen from "@/components/ReadyScreen";
import GamePlay from "@/components/GamePlay";
import TurnEndScreen from "@/components/TurnEndScreen";
import GameOverScreen from "@/components/GameOverScreen";

const STORAGE_KEY = "wordrush_game_state";

const loadGameState = (): GameState => {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as GameState;
      if (parsed.phase === "playing") {
        return { ...parsed, phase: "ready" };
      }
      return parsed;
    }
  } catch {}
  return DEFAULT_GAME_STATE;
};

const saveGameState = (state: GameState) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
};

const clearGameState = () => {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {}
};

const Index = () => {
  const [game, setGame] = useState<GameState>(loadGameState);
  const [lastScore, setLastScore] = useState(0);

  useEffect(() => {
    if (game.phase === "setup") {
      clearGameState();
    } else {
      saveGameState(game);
    }
  }, [game]);

  const handleStartGame = (state: GameState) => {
    resetWords();
    setGame(state);
  };

  const handleStartTurn = () => {
    setGame((g) => ({ ...g, phase: "playing" }));
  };

  const handleTurnEnd = useCallback((wordsGuessed: number) => {
    setLastScore(wordsGuessed);
    setGame((g) => {
      const newTeams = [...g.teams] as [typeof g.teams[0], typeof g.teams[1]];
      newTeams[g.currentTeamIndex] = {
        ...newTeams[g.currentTeamIndex],
        score: newTeams[g.currentTeamIndex].score + wordsGuessed,
        roundsPlayed: newTeams[g.currentTeamIndex].roundsPlayed + 1,
      };
      return { ...g, teams: newTeams, phase: "turnEnd" };
    });
  }, []);

  const isLastTurn = (() => {
    if (game.phase !== "turnEnd") return false;
    const nextTeamIndex = game.currentTeamIndex === 0 ? 1 : 0;
    const isRoundComplete = nextTeamIndex === 0;
    const nextRound = isRoundComplete ? game.currentRound + 1 : game.currentRound;
    return isRoundComplete && nextRound > game.totalRounds;
  })();

  const handleNextTurn = () => {
    setGame((g) => {
      const nextTeamIndex = g.currentTeamIndex === 0 ? 1 : 0;
      const isRoundComplete = nextTeamIndex === 0;
      const nextRound = isRoundComplete ? g.currentRound + 1 : g.currentRound;

      if (isRoundComplete && nextRound > g.totalRounds) {
        return { ...g, phase: "gameOver" };
      }

      const nextPlayerIndex = nextTeamIndex === 0
        ? (g.currentPlayerIndex + (isRoundComplete ? 1 : 0)) % g.teams[0].players.length
        : g.currentPlayerIndex % g.teams[1].players.length;

      return {
        ...g,
        currentTeamIndex: nextTeamIndex as 0 | 1,
        currentPlayerIndex: nextPlayerIndex,
        currentRound: nextRound,
        phase: "ready",
      };
    });
  };

  const handlePlayAgain = () => {
    resetWords();
    clearGameState();
    setGame(DEFAULT_GAME_STATE);
  };

  switch (game.phase) {
    case "setup":
      return <GameSetup onStartGame={handleStartGame} />;
    case "ready":
      return <ReadyScreen game={game} onStart={handleStartTurn} />;
    case "playing":
      return <GamePlay key={`${game.currentTeamIndex}-${game.currentPlayerIndex}-${game.currentRound}`} game={game} onTurnEnd={handleTurnEnd} onNewGame={handlePlayAgain} />;
    case "turnEnd":
      return <TurnEndScreen game={game} lastScore={lastScore} onNext={handleNextTurn} isLastTurn={isLastTurn} />;
    case "gameOver":
      return <GameOverScreen game={game} onPlayAgain={handlePlayAgain} />;
    default:
      return null;
  }
};

export default Index;
