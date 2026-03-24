import { useState } from "react";
import { GameState } from "@/lib/gameTypes";
import { Crown, RotateCcw, Trophy, Medal } from "lucide-react";
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

interface GameOverScreenProps {
  game: GameState;
  onPlayAgain: () => void;
}

export default function GameOverScreen({ game, onPlayAgain }: GameOverScreenProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [teamA, teamB] = game.teams;
  const winner = teamA.score > teamB.score ? 0 : teamB.score > teamA.score ? 1 : -1;
  const isTie = winner === -1;

  const sortedTeams = [...game.teams]
    .map((team, idx) => ({ team, originalIndex: idx }))
    .sort((a, b) => b.team.score - a.team.score);

  // All players across both teams, sorted by individual score
  const allPlayers = game.teams.flatMap((team, teamIdx) =>
    team.players.map((player) => ({ player, team, teamIdx }))
  ).sort((a, b) => b.player.score - a.player.score);

  const rankIcon = (rank: number) => {
    if (rank === 0) return <Crown className="w-4 h-4 text-yellow-400" />;
    if (rank === 1) return <Medal className="w-4 h-4 text-slate-400" />;
    if (rank === 2) return <Medal className="w-4 h-4 text-amber-600" />;
    return <span className="text-xs text-muted-foreground font-bold w-4 text-center">#{rank + 1}</span>;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="text-center animate-slide-up-fade max-w-md w-full">
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
        <p className="text-muted-foreground mb-8 text-lg">
          {isTie ? "What a match! Play again to break the tie." : "What a game! Congratulations! 🎉"}
        </p>

        {/* Team Leaderboard */}
        <div className="flex flex-col gap-4 mb-6">
          {sortedTeams.map(({ team, originalIndex }, rank) => {
            const isWinner = !isTie && rank === 0;
            const isA = originalIndex === 0;
            return (
              <div
                key={originalIndex}
                className={`rounded-xl px-6 py-5 border transition-all ${
                  isWinner
                    ? isA
                      ? "bg-team-a/15 border-team-a/40 card-glow-team-a scale-[1.03]"
                      : "bg-team-b/15 border-team-b/40 card-glow-team-b scale-[1.03]"
                    : "bg-card border-border"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-2xl font-bold ${
                      isWinner ? "text-accent" : "text-muted-foreground"
                    }`}>
                      {isWinner ? <Trophy className="w-6 h-6" /> : `#${rank + 1}`}
                    </span>
                    <div className="text-left">
                      <p className={`font-display font-semibold ${isA ? "text-team-a" : "text-team-b"}`}>
                        {team.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {team.roundsPlayed} rounds · {team.players.length} players
                      </p>
                    </div>
                  </div>
                  <p className={`text-4xl font-bold ${isA ? "text-team-a" : "text-team-b"}`}>
                    {team.score}
                  </p>
                </div>
                {/* Score bar */}
                <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      isA ? "bg-team-a" : "bg-team-b"
                    }`}
                    style={{
                      width: `${Math.max(sortedTeams[0].team.score, 1) > 0
                        ? (team.score / Math.max(sortedTeams[0].team.score, 1)) * 100
                        : 0}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Player Rankings */}
        {allPlayers.length > 0 && (
          <div className="mb-8">
            <h3 className="text-sm font-display font-semibold text-muted-foreground uppercase tracking-widest mb-3">
              Player Rankings
            </h3>
            <div className="flex flex-col gap-2">
              {allPlayers.map(({ player, team, teamIdx }, rank) => {
                const isA = teamIdx === 0;
                return (
                  <div
                    key={`${teamIdx}-${player.name}`}
                    className={`flex items-center justify-between rounded-lg px-4 py-2.5 border ${
                      rank === 0
                        ? isA
                          ? "bg-team-a/10 border-team-a/30"
                          : "bg-team-b/10 border-team-b/30"
                        : "bg-card border-border"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center justify-center w-5">
                        {rankIcon(rank)}
                      </span>
                      <div className="text-left">
                        <p className="text-sm font-semibold">{player.name}</p>
                        <p className={`text-xs ${isA ? "text-team-a" : "text-team-b"}`}>{team.name}</p>
                      </div>
                    </div>
                    <p className={`text-lg font-bold ${isA ? "text-team-a" : "text-team-b"}`}>
                      {player.score} <span className="text-xs font-normal text-muted-foreground">pts</span>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={() => setConfirmOpen(true)}
          className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg transition-all active:scale-[0.97] shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
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
            <AlertDialogAction onClick={onPlayAgain}>New Game</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
