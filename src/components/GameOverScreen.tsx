import { GameState } from "@/lib/gameTypes";
import { Crown, RotateCcw } from "lucide-react";

interface GameOverScreenProps {
  game: GameState;
  onPlayAgain: () => void;
}

export default function GameOverScreen({ game, onPlayAgain }: GameOverScreenProps) {
  const [teamA, teamB] = game.teams;
  const winner = teamA.score > teamB.score ? 0 : teamB.score > teamA.score ? 1 : -1;
  const isTie = winner === -1;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center animate-slide-up-fade max-w-md">
        {/* Crown */}
        <div className="relative mb-6">
          <Crown className="w-16 h-16 mx-auto text-accent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-accent/20 animate-pulse-ring" />
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-glow-accent">
          {isTie ? "It's a Tie!" : `${game.teams[winner as number].name} Wins!`}
        </h1>
        <p className="text-muted-foreground mb-10 text-lg">
          {isTie ? "What a match! Play again to break the tie." : "What a game! Congratulations! 🎉"}
        </p>

        {/* Final Scores */}
        <div className="flex gap-4 justify-center mb-10">
          <div className={`rounded-xl px-6 py-6 flex-1 border transition-all ${
            winner === 0
              ? "bg-team-a/15 border-team-a/40 card-glow-team-a scale-105"
              : "bg-card border-border"
          }`}>
            {winner === 0 && <Crown className="w-6 h-6 text-accent mx-auto mb-2" />}
            <p className="text-sm text-muted-foreground">{teamA.name}</p>
            <p className="text-4xl font-bold text-team-a">{teamA.score}</p>
          </div>
          <div className={`rounded-xl px-6 py-6 flex-1 border transition-all ${
            winner === 1
              ? "bg-team-b/15 border-team-b/40 card-glow-team-b scale-105"
              : "bg-card border-border"
          }`}>
            {winner === 1 && <Crown className="w-6 h-6 text-accent mx-auto mb-2" />}
            <p className="text-sm text-muted-foreground">{teamB.name}</p>
            <p className="text-4xl font-bold text-team-b">{teamB.score}</p>
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg transition-all active:scale-[0.97] shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    </div>
  );
}