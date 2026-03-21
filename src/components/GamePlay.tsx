import { useState, useEffect, useRef } from "react";
import { getRandomWord } from "@/lib/words";
import { GameState } from "@/lib/gameTypes";

interface GamePlayProps {
  game: GameState;
  onTurnEnd: (wordsGuessed: number) => void;
}

interface WordItem {
  word: string;
  guessed: boolean;
}

export default function GamePlay({ game, onTurnEnd }: GamePlayProps) {
  const [timeLeft, setTimeLeft] = useState<number>(game.roundTime);
  const [words, setWords] = useState<WordItem[]>(() =>
    Array.from({ length: game.wordsPerTurn }, () => ({
      word: getRandomWord(),
      guessed: false,
    }))
  );
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const isTeamA = game.currentTeamIndex === 0;

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const timedOut = timeLeft === 0;

  const toggleWord = (index: number) => {
    if (finished) return;
    setWords((prev) =>
      prev.map((w, i) => (i === index ? { ...w, guessed: !w.guessed } : w))
    );
  };

  const handleDone = () => {
    if (finished) return;
    setFinished(true);
    clearInterval(timerRef.current);
    const score = words.filter((w) => w.guessed).length;
    onTurnEnd(score);
  };

  const progress = timeLeft / game.roundTime;
  const isUrgent = timeLeft <= 5;
  const circumference = 2 * Math.PI * 54;
  const guessedCount = words.filter((w) => w.guessed).length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-6 safe-area-inset">
      <div className="w-full max-w-sm flex flex-col items-center flex-1">
        {/* Timer */}
        <div className="relative w-24 h-24 mx-auto mb-4 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
            <circle
              cx="60" cy="60" r="54" fill="none"
              stroke={isUrgent ? "hsl(var(--destructive))" : isTeamA ? "hsl(var(--team-a))" : "hsl(var(--team-b))"}
              strokeWidth="8" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className="transition-all duration-1000 linear"
            />
          </svg>
          <span className={`absolute inset-0 flex items-center justify-center text-2xl font-display font-bold ${isUrgent ? "text-destructive animate-countdown-pulse" : ""}`}>
            {timeLeft}
          </span>
        </div>

        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
          Tap words your team guesses
        </p>

        {/* Word list */}
        <div className="w-full space-y-3 flex-1">
          {words.map((w, i) => (
            <button
              key={i}
              onClick={() => toggleWord(i)}
              className={`w-full py-4 px-5 rounded-xl text-xl font-display font-bold transition-all active:scale-[0.97] border-2 text-left ${
                w.guessed
                  ? "bg-green-500/15 border-green-500/50 text-green-400"
                  : "bg-card border-border text-foreground hover:border-muted-foreground/30"
              }`}
            >
              <span className="flex items-center justify-between">
                <span>{w.word}</span>
                {w.guessed && <span className="text-green-400 text-lg">✓</span>}
              </span>
            </button>
          ))}
        </div>

        {/* Score + Done */}
        <div className="w-full mt-6 shrink-0">
          <p className="text-center text-muted-foreground text-sm mb-3">
            <span className={isTeamA ? "text-team-a" : "text-team-b"}>{guessedCount}</span> / {words.length} guessed
          </p>
          <button
            onClick={handleDone}
            className={`w-full py-4 rounded-lg font-display font-bold text-lg transition-all active:scale-95 shadow-lg ${
              isTeamA
                ? "bg-team-a text-team-a-foreground shadow-team-a/30"
                : "bg-team-b text-team-b-foreground shadow-team-b/30"
            }`}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
