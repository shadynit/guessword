import { GameState } from "@/lib/gameTypes";
import { Crown, RotateCcw, Trophy } from "lucide-react";

interface GameOverScreenProps {
  game: GameState;
  onPlayAgain: () => void;
}

export default function GameOverScreen({ game, onPlayAgain }: GameOverScreenProps) {
  const [teamA, teamB] = game.teams;
  const winner = teamA.score > teamB.score ? 0 : teamB.score > teamA.score ? 1 : -1;
  const isTie = winner === -1;

  const sortedTeams = [...game.teams]
    .map((team, idx) => ({ team, originalIndex: idx }))
    .sort((a, b) => b.team.score - a.team.score);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
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

        {/* Leaderboard */}
        <div className="flex flex-col gap-4 mb-10">
          {sortedTeams.map(({ team, originalIndex }, rank) => {
            const isWinner = !isTie && rank === 0;
            const isA = originalIndex === 0;
            const topPlayers = team.players.slice(0, 3);
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
                        {team.roundsPlayed} rounds played · {team.players.length} players
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
                {/* Top 3 players */}
                {topPlayers.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {topPlayers.map((p, i) => (
                      <span
                        key={i}
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          isA ? "bg-team-a/10 text-team-a" : "bg-team-b/10 text-team-b"
                        }`}
                      >
                        {p.name}
                      </span>
                    ))}
                    {team.players.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{team.players.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full py-4 rounded-lg bg-primary text-primary-foreground font-display font-bold text-lg transition-all active:scale-[0.97] shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          New Game
        </button>
      </div>
    </div>
  );
}
