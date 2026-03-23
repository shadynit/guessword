import { useState, useEffect, useRef } from "react";
import { getRandomWord } from "@/lib/words";
import { playBuzzer } from "@/lib/buzzer";
import { GameState } from "@/lib/gameTypes";
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

interface GamePlayProps {
  game: GameState;
  onTurnEnd: (wordsGuessed: number) => void;
  onNewGame: () => void;
}

interface WordItem {
  word: string;
  guessed: boolean;
}

export default function GamePlay({ game, onTurnEnd, onNewGame }: GamePlayProps) {
  const [timeLeft, setTimeLeft] = useState<number>(game.roundTime);
  const [words, setWords] = useState<WordItem[]>(() =>
    Array.from({ length: game.wordsPerTurn }, () => ({
      word: getRandomWord(game.adultMode, game.selectedCategories),
      guessed: false,
    }))
  );
  const [finished, setFinished] = useState(false);
  const [splashDismissed, setSplashDismissed] = useState(false);
  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);
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

  useEffect(() => {
    if (timedOut) playBuzzer();
  }, [timedOut]);

  const toggleWord = (index: number) => {
    if (finished) return;
    if (timedOut && !splashDismissed) return;
    setWords((prev) =>
      prev.map((w, i) => (i === index ? { ...w, guessed: !w.guessed } : w))
    );
  };

  const allGuessed = words.every((w) => w.guessed);

  const handleDone = () => {
    if (finished) return;
    if (!timedOut && !allGuessed) return;
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
    <div className="h-[100dvh] flex flex-col items-center px-4 py-3 safe-area-inset relative overflow-hidden">
      {/* Time's Up Splash Overlay */}
      {timedOut && !splashDismissed && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="text-center animate-in zoom-in-95 duration-500">
            <div className={`w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center ${
              isTeamA ? "bg-team-a/20" : "bg-team-b/20"
            }`}>
              <span className="text-5xl">⏰</span>
            </div>
            <h2 className="text-4xl font-display font-bold text-foreground mb-2">Time's Up!</h2>
            <p className="text-muted-foreground mb-8 text-lg">Stop guessing! Review the words now.</p>
            <button
              onClick={() => setSplashDismissed(true)}
              className={`px-8 py-4 rounded-lg font-display font-bold text-lg transition-all active:scale-95 shadow-lg ${
                isTeamA
                  ? "bg-team-a text-team-a-foreground shadow-team-a/30"
                  : "bg-team-b text-team-b-foreground shadow-team-b/30"
              }`}
            >
              Review Selections
            </button>
          </div>
        </div>
      )}

      <div className="w-full max-w-sm flex flex-col items-center flex-1 min-h-0">
        {/* New Game button */}
        <div className="w-full flex justify-end mb-1 shrink-0">
          <button onClick={() => setShowNewGameConfirm(true)} className="text-xs text-muted-foreground underline">New Game</button>
        </div>

        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 shrink-0">
          {timedOut && splashDismissed && !finished ? "⏰ Review & confirm selections" : allGuessed && !timedOut ? "🎉 All guessed! Confirm to continue" : "Tap words your team guesses"}
        </p>

        {/* Word list */}
        <div className="w-full flex-1 min-h-0 flex flex-col gap-2 justify-center">
          {words.map((w, i) => (
            <button
              key={i}
              onClick={() => toggleWord(i)}
              disabled={!splashDismissed && timedOut}
              className={`w-full py-3 px-4 rounded-xl text-lg font-display font-bold transition-all active:scale-[0.97] border-2 text-left ${
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

        {/* Timer - below words for better focus */}
        <div className="flex items-center gap-3 mt-2 shrink-0">
          <div className="relative w-14 h-14">
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
            <span className={`absolute inset-0 flex items-center justify-center text-base font-display font-bold ${isUrgent ? "text-destructive animate-countdown-pulse" : ""}`}>
              {timeLeft}
            </span>
          </div>
          <p className="text-muted-foreground text-sm">
            <span className={isTeamA ? "text-team-a" : "text-team-b"}>{guessedCount}</span> / {words.length} guessed
          </p>
        </div>

        {/* Done */}
        <div className="w-full mt-1 shrink-0">
          {((timedOut && splashDismissed) || allGuessed) && !finished && (
            <button
              onClick={handleDone}
              className={`w-full py-3 rounded-lg font-display font-bold text-lg transition-all active:scale-95 shadow-lg ${
                isTeamA
                  ? "bg-team-a text-team-a-foreground shadow-team-a/30"
                  : "bg-team-b text-team-b-foreground shadow-team-b/30"
              }`}
            >
              Confirm & Continue
            </button>
          )}
        </div>
      </div>

      <AlertDialog open={showNewGameConfirm} onOpenChange={setShowNewGameConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Start a New Game?</AlertDialogTitle>
            <AlertDialogDescription>
              This will reset all scores and progress. Are you sure you want to start over?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onNewGame}>Yes, Reset</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
