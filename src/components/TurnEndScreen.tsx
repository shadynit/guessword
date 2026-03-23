import { useState, useEffect } from "react";
import { GameState } from "@/lib/gameTypes";
import { Trophy } from "lucide-react";

interface TurnEndScreenProps {
  game: GameState;
  lastScore: number;
  onNext: () => void;
}

export default function TurnEndScreen({ game, lastScore, onNext }: TurnEndScreenProps) {
  const team = game.teams[game.currentTeamIndex];
  const player = team.players[game.currentPlayerIndex];
  const isTeamA = game.currentTeamIndex === 0;
  const [showScorePop, setShowScorePop] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowScorePop(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const roundProgress = (game.currentRound / game.totalRounds) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center animate-slide-up-fade max-w-md w-full">
        <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative ${
          isTeamA ? "bg-team-a/20" : "bg-team-b/20"
        }`}>
          <Trophy className={`w-10 h-10 ${isTeamA ? "text-team-a" : "text-team-b"}`} />
          {/* Score pop animation */}
          {showScorePop && lastScore > 0 && (
            <span className={`absolute text-5xl font-display font-bold animate-score-pop ${
              isTeamA ? "text-team-a" : "text-team-b"
            }`}>
              +{lastScore}
            </span>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-2">Time's Up!</h2>
        <p className="text-muted-foreground mb-4">
          {player.name} got <span className={`font-bold text-2xl ${isTeamA ? "text-team-a" : "text-team-b"}`}>{lastScore}</span> word{lastScore !== 1 ? "s" : ""} right
        </p>

        {/* Round progress */}
        <div className="mb-6">
          <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-widest">
            Round {game.currentRound} of {game.totalRounds}
          </p>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${roundProgress}%` }}
            />
          </div>
        </div>

        {/* Scores */}
        <div className="flex gap-4 justify-center mb-8">
          <div className="bg-card rounded-lg px-6 py-4 card-glow-team-a border border-team-a/20 flex-1">
            <p className="text-sm text-muted-foreground">{game.teams[0].name}</p>
            <p className="text-3xl font-bold text-team-a">{game.teams[0].score}</p>
          </div>
          <div className="bg-card rounded-lg px-6 py-4 card-glow-team-b border border-team-b/20 flex-1">
            <p className="text-sm text-muted-foreground">{game.teams[1].name}</p>
            <p className="text-3xl font-bold text-team-b">{game.teams[1].score}</p>
          </div>
        </div>

        <button
          onClick={onNext}
          className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg transition-all active:scale-[0.97] shadow-lg shadow-primary/30"
        >
          Next Turn
        </button>
      </div>
    </div>
  );
}
