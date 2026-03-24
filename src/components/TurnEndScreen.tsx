import { useState, useEffect } from "react";
import { GameState } from "@/lib/gameTypes";
import { Trophy, RotateCcw } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface TurnEndScreenProps {
  game: GameState;
  lastScore: number;
  onNext: () => void;
  isLastTurn: boolean;
  onNewGame: () => void;
}

export default function TurnEndScreen({ game, lastScore, onNext, isLastTurn, onNewGame }: TurnEndScreenProps) {
  const team = game.teams[game.currentTeamIndex];
  const player = team.players[game.currentPlayerIndex];
  const isTeamA = game.currentTeamIndex === 0;
  const [showScorePop, setShowScorePop] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowScorePop(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center animate-slide-up-fade max-w-md w-full">
        <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center relative ${
          isTeamA ? "bg-team-a/20" : "bg-team-b/20"
        }`}>
          <Trophy className={`w-10 h-10 ${isTeamA ? "text-team-a" : "text-team-b"}`} />
          {showScorePop && lastScore > 0 && (
            <span className={`absolute text-5xl font-display font-bold animate-score-pop ${
              isTeamA ? "text-team-a" : "text-team-b"
            }`}>
              +{lastScore}
            </span>
          )}
        </div>

        <h2 className="text-3xl font-bold mb-2">Time's Up!</h2>
        <p className="text-muted-foreground mb-6">
          {player.name} got <span className={`font-bold text-2xl ${isTeamA ? "text-team-a" : "text-team-b"}`}>{lastScore}</span> word{lastScore !== 1 ? "s" : ""} right
        </p>

        {/* Scores with per-team round info */}
        <div className="flex gap-4 justify-center mb-8">
          {game.teams.map((t, idx) => {
            const isA = idx === 0;
            const isCurrent = idx === game.currentTeamIndex;
            return (
              <div key={idx} className={`rounded-lg px-6 py-4 flex-1 border ${
                isCurrent
                  ? isA ? "bg-team-a/10 border-team-a/30 card-glow-team-a" : "bg-team-b/10 border-team-b/30 card-glow-team-b"
                  : "bg-card border-border"
              }`}>
                <p className="text-sm text-muted-foreground">{t.name}</p>
                <p className={`text-3xl font-bold ${isA ? "text-team-a" : "text-team-b"}`}>{t.score}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {t.roundsPlayed} / {game.totalRounds} rounds
                </p>
                <div className="mt-1.5 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${isA ? "bg-team-a" : "bg-team-b"}`}
                    style={{ width: `${(t.roundsPlayed / game.totalRounds) * 100}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={onNext}
          className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg transition-all active:scale-[0.97] shadow-lg shadow-primary/30"
        >
          {isLastTurn ? "🏆 Show Winner" : "Next Turn"}
        </button>

        <button
          onClick={() => setConfirmOpen(true)}
          className="mt-4 flex items-center justify-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mx-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          New Game
        </button>
      </div>

      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start a new game?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all scores and progress. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onNewGame}>New Game</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
