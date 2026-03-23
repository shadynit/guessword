import { useState } from "react";
import { GameState, DEFAULT_GAME_STATE, WordCategory, CATEGORY_LABELS } from "@/lib/gameTypes";
import { Plus, X, Users, Timer, Zap, Tags, BookOpen, Check } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

interface GameSetupProps {
  onStartGame: (state: GameState) => void;
}

export default function GameSetup({ onStartGame }: GameSetupProps) {
  const [teamAName, setTeamAName] = useState("Team Alpha");
  const [teamBName, setTeamBName] = useState("Team Beta");
  const [teamAPlayers, setTeamAPlayers] = useState<string[]>([""]);
  const [teamBPlayers, setTeamBPlayers] = useState<string[]>([""]);
  const [roundTime, setRoundTime] = useState<30 | 60 | 90>(30);
  const [wordsPerTurn, setWordsPerTurn] = useState<5 | 6>(5);
  const [totalRounds, setTotalRounds] = useState(4);
  const [selectedCategories, setSelectedCategories] = useState<WordCategory[]>(["all"]);

  const addPlayer = (team: "a" | "b") => {
    if (team === "a") setTeamAPlayers([...teamAPlayers, ""]);
    else setTeamBPlayers([...teamBPlayers, ""]);
  };

  const removePlayer = (team: "a" | "b", idx: number) => {
    if (team === "a") setTeamAPlayers(teamAPlayers.filter((_, i) => i !== idx));
    else setTeamBPlayers(teamBPlayers.filter((_, i) => i !== idx));
  };

  const updatePlayer = (team: "a" | "b", idx: number, val: string) => {
    if (team === "a") {
      const copy = [...teamAPlayers];
      copy[idx] = val;
      setTeamAPlayers(copy);
    } else {
      const copy = [...teamBPlayers];
      copy[idx] = val;
      setTeamBPlayers(copy);
    }
  };

  const canStart =
    teamAPlayers.filter((p) => p.trim()).length >= 2 &&
    teamBPlayers.filter((p) => p.trim()).length >= 2;

  const toggleCategory = (cat: WordCategory) => {
    setSelectedCategories((prev) => {
      if (cat === "all") return ["all"];
      const without = prev.filter((c) => c !== "all");
      if (without.includes(cat)) {
        const result = without.filter((c) => c !== cat);
        return result.length === 0 ? ["all"] : result;
      }
      return [...without, cat];
    });
  };

  const adultMode = selectedCategories.includes("adult") || selectedCategories.includes("all");

  const handleStart = () => {
    const state: GameState = {
      ...DEFAULT_GAME_STATE,
      teams: [
        {
          name: teamAName || "Team Alpha",
          players: teamAPlayers.filter((p) => p.trim()).map((p) => ({ name: p.trim() })),
          score: 0,
        },
        {
          name: teamBName || "Team Beta",
          players: teamBPlayers.filter((p) => p.trim()).map((p) => ({ name: p.trim() })),
          score: 0,
        },
      ],
      roundTime,
      wordsPerTurn,
      totalRounds,
      adultMode,
      selectedCategories,
      phase: "ready",
    };
    onStartGame(state);
  };

  const timeOptions: (30 | 60 | 90)[] = [30, 60, 90];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl animate-slide-up-fade">
        {/* Theme toggle */}
        <div className="flex justify-end mb-2">
          <ThemeToggle />
        </div>
        {/* Title */}
        <div className="text-center mb-10">
          <h1 className="text-5xl sm:text-6xl font-bold text-glow tracking-tight leading-none mb-3">
            Word Rush
          </h1>
          <p className="text-muted-foreground text-lg">
            Describe the word. Don't say it. Beat the clock.
          </p>
        </div>

        {/* Game Instructions */}
        <div className="bg-card rounded-lg p-5 border border-border mb-8">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-primary" />
            <span className="text-lg font-display font-semibold">How to Play</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The goal of the game is to explain as many words as possible within 30 seconds or a defined time and have your teammates guess the words. You are not allowed to use parts of the word or a translation in a different language. You get a point for every correct word.
          </p>
        </div>

        {/* Teams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          {/* Team A */}
          <div className="bg-card rounded-lg p-5 card-glow-team-a border border-team-a/20">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-team-a" />
              <input
                value={teamAName}
                onChange={(e) => setTeamAName(e.target.value)}
                className="bg-transparent border-none text-team-a font-display text-xl font-semibold outline-none w-full placeholder:text-team-a/40"
                placeholder="Team name"
              />
            </div>
            <div className="space-y-2">
              {teamAPlayers.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={p}
                    onChange={(e) => updatePlayer("a", i, e.target.value)}
                    placeholder={`Player ${i + 1}`}
                    className="flex-1 bg-muted rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-team-a/50 placeholder:text-muted-foreground"
                  />
                  {teamAPlayers.length > 1 && (
                    <button
                      onClick={() => removePlayer("a", i)}
                      className="text-muted-foreground hover:text-destructive transition-colors active:scale-95"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addPlayer("a")}
                className="flex items-center gap-1 text-sm text-team-a/70 hover:text-team-a transition-colors mt-1 active:scale-95"
              >
                <Plus className="w-4 h-4" /> Add player
              </button>
            </div>
          </div>

          {/* Team B */}
          <div className="bg-card rounded-lg p-5 card-glow-team-b border border-team-b/20">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-team-b" />
              <input
                value={teamBName}
                onChange={(e) => setTeamBName(e.target.value)}
                className="bg-transparent border-none text-team-b font-display text-xl font-semibold outline-none w-full placeholder:text-team-b/40"
                placeholder="Team name"
              />
            </div>
            <div className="space-y-2">
              {teamBPlayers.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    value={p}
                    onChange={(e) => updatePlayer("b", i, e.target.value)}
                    placeholder={`Player ${i + 1}`}
                    className="flex-1 bg-muted rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-team-b/50 placeholder:text-muted-foreground"
                  />
                  {teamBPlayers.length > 1 && (
                    <button
                      onClick={() => removePlayer("b", i)}
                      className="text-muted-foreground hover:text-destructive transition-colors active:scale-95"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => addPlayer("b")}
                className="flex items-center gap-1 text-sm text-team-b/70 hover:text-team-b transition-colors mt-1 active:scale-95"
              >
                <Plus className="w-4 h-4" /> Add player
              </button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-card rounded-lg p-5 card-glow border border-border mb-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Timer className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Timer per turn</span>
              </div>
              <div className="flex gap-2">
                {timeOptions.map((t) => (
                  <button
                    key={t}
                    onClick={() => setRoundTime(t)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all active:scale-95 ${
                      roundTime === t
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}s
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Words per turn</span>
              </div>
              <div className="flex gap-2">
                {([5, 6] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => setWordsPerTurn(w)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all active:scale-95 ${
                      wordsPerTurn === w
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">Total rounds</span>
              </div>
              <div className="flex gap-2">
                {[2, 4, 6].map((r) => (
                  <button
                    key={r}
                    onClick={() => setTotalRounds(r)}
                    className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all active:scale-95 ${
                      totalRounds === r
                        ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r}
                  </button>
                ))}
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={[2, 4, 6].includes(totalRounds) ? "" : totalRounds}
                  placeholder="Custom"
                  onChange={(e) => {
                    const v = parseInt(e.target.value);
                    if (v >= 1 && v <= 50) setTotalRounds(v);
                  }}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold text-center outline-none transition-all ${
                    ![2, 4, 6].includes(totalRounds)
                      ? "bg-accent text-accent-foreground shadow-lg shadow-accent/25"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  } placeholder:text-muted-foreground`}
                />
              </div>
            </div>
          </div>

          {/* 18+ Toggle */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="w-4 h-4 text-destructive" />
              <span className="text-sm font-medium">18+ Words</span>
            </div>
            <button
              onClick={() => setAdultMode(!adultMode)}
              className={`w-full py-2 rounded-md text-sm font-semibold transition-all active:scale-95 ${
                adultMode
                  ? "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/25"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              {adultMode ? "🔥 ON" : "OFF"}
            </button>
          </div>
        </div>

        {/* Start */}
        <button
          disabled={!canStart}
          onClick={handleStart}
          className={`w-full py-4 rounded-lg text-lg font-display font-bold transition-all active:scale-[0.97] ${
            canStart
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 hover:shadow-primary/50"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {canStart ? "Let's Go!" : "Add at least 2 players per team"}
        </button>
      </div>
    </div>
  );
}