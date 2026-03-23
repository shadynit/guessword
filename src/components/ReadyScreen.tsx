import { GameState } from "@/lib/gameTypes";
import { Eye, EyeOff, BookOpen } from "lucide-react";

interface ReadyScreenProps {
  game: GameState;
  onStart: () => void;
}

export default function ReadyScreen({ game, onStart }: ReadyScreenProps) {
  const team = game.teams[game.currentTeamIndex];
  const player = team.players[game.currentPlayerIndex];
  const isTeamA = game.currentTeamIndex === 0;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center animate-slide-up-fade max-w-md">
        {/* Round info */}
        <p className="text-muted-foreground text-sm mb-2 tracking-widest uppercase">
          Round {game.currentRound} of {game.totalRounds}
        </p>

        {/* Team name */}
        <h2
          className={`text-4xl font-bold mb-2 ${
            isTeamA ? "text-team-a" : "text-team-b"
          }`}
        >
          {team.name}
        </h2>

        {/* Player name */}
        <p className="text-2xl font-display mb-8">{player.name}'s turn</p>

        {/* Instructions */}
        <div className="bg-card rounded-lg p-6 mb-8 border border-border text-left space-y-3">
          <div className="flex items-start gap-3">
            <Eye className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <p className="text-sm">Only <strong>{player.name}</strong> should look at the screen to see the word</p>
          </div>
          <div className="flex items-start gap-3">
            <EyeOff className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
            <p className="text-sm">You are <strong>not allowed</strong> to use parts of the word or a translation in a different language. You get a point for every correct word.</p>
          </div>
        </div>

        {/* Round progress */}
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-1.5 uppercase tracking-widest">
            Round {game.currentRound} of {game.totalRounds}
          </p>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${(game.currentRound / game.totalRounds) * 100}%` }}
            />
          </div>
        </div>

        {/* Scores */}
        <div className="flex gap-4 justify-center mb-8">
          <div className={`rounded-md px-4 py-2 flex-1 ${isTeamA ? "bg-team-a/20 border border-team-a/30" : "bg-muted"}`}>
            <p className="text-xs text-muted-foreground">{game.teams[0].name}</p>
            <p className="text-2xl font-bold text-team-a">{game.teams[0].score}</p>
          </div>
          <div className={`rounded-md px-4 py-2 flex-1 ${!isTeamA ? "bg-team-b/20 border border-team-b/30" : "bg-muted"}`}>
            <p className="text-xs text-muted-foreground">{game.teams[1].name}</p>
            <p className="text-2xl font-bold text-team-b">{game.teams[1].score}</p>
          </div>
        </div>

        <button
          onClick={onStart}
          className={`w-full py-4 rounded-lg text-lg font-display font-bold transition-all active:scale-[0.97] shadow-lg ${
            isTeamA
              ? "bg-team-a text-team-a-foreground shadow-team-a/30"
              : "bg-team-b text-team-b-foreground shadow-team-b/30"
          }`}
        >
          I'm Ready — Show the Word!
        </button>
      </div>
    </div>
  );
}