import { useState, useEffect, useCallback, useRef } from "react";
import { getRandomWord } from "@/lib/words";
import { GameState } from "@/lib/gameTypes";
import { Check, SkipForward } from "lucide-react";

interface GamePlayProps {
  game: GameState;
  onTurnEnd: (wordsGuessed: number) => void;
}

export default function GamePlay({ game, onTurnEnd }: GamePlayProps) {
  const [timeLeft, setTimeLeft] = useState(game.roundTime);
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [wordsGuessed, setWordsGuessed] = useState(0);
  const [wordKey, setWordKey] = useState(0);
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

  useEffect(() => {
    if (timeLeft === 0) {
      onTurnEnd(wordsGuessed);
    }
  }, [timeLeft, wordsGuessed, onTurnEnd]);

  const nextWord = useCallback(() => {
    setCurrentWord(getRandomWord());
    setWordKey((k) => k + 1);
  }, []);

  const handleCorrect = () => {
    setWordsGuessed((w) => w + 1);
    nextWord();
  };

  const handleSkip = () => {
    nextWord();
  };

  const progress = timeLeft / game.roundTime;
  const isUrgent = timeLeft <= 5;
  const circumference = 2 * Math.PI * 54;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="text-center w-full max-w-md">
        {/* Timer */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <circle
              cx="60" cy="60" r="54"
              fill="none"
              stroke={isUrgent ? "hsl(var(--destructive))" : isTeamA ? "hsl(var(--team-a))" : "hsl(var(--team-b))"}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - progress)}
              className="transition-all duration-1000 linear"
            />
          </svg>
          <span
            className={`absolute inset-0 flex items-center justify-center text-4xl font-display font-bold ${
              isUrgent ? "text-destructive animate-countdown-pulse" : ""
            }`}
          >
            {timeLeft}
          </span>
        </div>

        {/* Word */}
        <div
          key={wordKey}
          className="bg-card rounded-xl p-8 mb-6 card-glow border border-border animate-word-reveal"
        >
          <p className="text-sm text-muted-foreground mb-2 uppercase tracking-widest">Describe this word</p>
          <h2 className="text-4xl sm:text-5xl font-bold font-display text-glow-accent text-accent leading-tight">
            {currentWord}
          </h2>
        </div>

        {/* Score this turn */}
        <p className="text-muted-foreground mb-6">
          Words guessed: <span className="text-foreground font-bold text-xl">{wordsGuessed}</span>
        </p>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleSkip}
            className="flex-1 py-4 rounded-lg bg-muted text-muted-foreground font-display font-semibold text-lg transition-all hover:bg-muted/80 active:scale-95 flex items-center justify-center gap-2"
          >
            <SkipForward className="w-5 h-5" />
            Skip
          </button>
          <button
            onClick={handleCorrect}
            className={`flex-1 py-4 rounded-lg font-display font-semibold text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg ${
              isTeamA
                ? "bg-team-a text-team-a-foreground shadow-team-a/30"
                : "bg-team-b text-team-b-foreground shadow-team-b/30"
            }`}
          >
            <Check className="w-5 h-5" />
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
}