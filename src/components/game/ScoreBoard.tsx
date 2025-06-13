import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ScoreBoardProps {
  score: { home: number; away: number };
  gameTime: number;
  isPlaying: boolean;
}

export const ScoreBoard = ({ score, gameTime, isPlaying }: ScoreBoardProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Main Score Display */}
      <Card className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border-white/20 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
            ⚽ Live Score
            {isPlaying && (
              <Badge variant="destructive" className="animate-pulse">
                LIVE
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            {/* Home Team */}
            <div className="text-center flex-1">
              <div className="text-sm text-emerald-200 mb-1">HOME</div>
              <div className="w-12 h-12 bg-team-home rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold shadow-lg">
                H
              </div>
              <div className={cn(
                "text-3xl font-bold transition-all duration-300",
                score.home > score.away && "text-game-goal animate-goal-celebration"
              )}>
                {score.home}
              </div>
            </div>

            {/* VS and Time */}
            <div className="text-center px-4">
              <div className="text-xs text-emerald-200 mb-1">TIME</div>
              <div className="text-lg font-mono bg-black/30 px-2 py-1 rounded mb-2">
                {formatTime(gameTime)}
              </div>
              <div className="text-sm text-emerald-300 font-bold">VS</div>
            </div>

            {/* Away Team */}
            <div className="text-center flex-1">
              <div className="text-sm text-emerald-200 mb-1">AWAY</div>
              <div className="w-12 h-12 bg-team-away rounded-full mx-auto mb-2 flex items-center justify-center text-white font-bold shadow-lg">
                A
              </div>
              <div className={cn(
                "text-3xl font-bold transition-all duration-300",
                score.away > score.home && "text-game-goal animate-goal-celebration"
              )}>
                {score.away}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Stats */}
      <Card className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border-white/20 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-lg">📊 Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-emerald-200">Total Goals:</span>
            <Badge variant="outline" className="text-white border-white/30">
              {score.home + score.away}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-emerald-200">Game Status:</span>
            <Badge 
              variant={isPlaying ? "destructive" : "secondary"}
              className={isPlaying ? "animate-pulse" : ""}
            >
              {isPlaying ? "Playing" : "Paused"}
            </Badge>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-emerald-200">Leading Team:</span>
            <Badge 
              variant="outline" 
              className={cn(
                "text-white border-white/30",
                score.home > score.away && "bg-team-home/20 border-team-home",
                score.away > score.home && "bg-team-away/20 border-team-away",
                score.home === score.away && "bg-team-neutral/20 border-team-neutral"
              )}
            >
              {score.home > score.away ? "HOME" : 
               score.away > score.home ? "AWAY" : "TIE"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Match Info */}
      <Card className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border-white/20 text-white">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="text-sm text-emerald-200">⚡ Football Champions</div>
            <div className="text-xs text-emerald-300">Live Match Experience</div>
            {gameTime > 0 && (
              <div className="text-xs text-emerald-400">
                Match Duration: {formatTime(gameTime)}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};