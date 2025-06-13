import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Users, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameControlsProps {
  isPlaying: boolean;
  onToggleGame: () => void;
  onResetGame: () => void;
  selectedPlayer: string | null;
  gameTime: number;
}

export const GameControls = ({ 
  isPlaying, 
  onToggleGame, 
  onResetGame, 
  selectedPlayer,
  gameTime 
}: GameControlsProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Game Controls */}
      <Card className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border-white/20 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-lg flex items-center justify-center gap-2">
            🎮 Game Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Main Controls */}
          <div className="flex gap-2">
            <Button
              onClick={onToggleGame}
              className={cn(
                "flex-1 transition-all duration-300",
                isPlaying 
                  ? "bg-destructive hover:bg-destructive/80" 
                  : "bg-game-goal hover:bg-game-goal/80"
              )}
              size="lg"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Play
                </>
              )}
            </Button>
            
            <Button
              onClick={onResetGame}
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Game Time */}
          <div className="flex items-center justify-between bg-black/30 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-emerald-300" />
              <span className="text-sm text-emerald-200">Time:</span>
            </div>
            <div className="font-mono text-lg text-white">
              {formatTime(gameTime)}
            </div>
          </div>

          {/* Selected Player */}
          <div className="bg-black/30 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-300" />
                <span className="text-sm text-emerald-200">Selected:</span>
              </div>
            </div>
            {selectedPlayer ? (
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold",
                  selectedPlayer.startsWith('h') ? "bg-team-home" : "bg-team-away"
                )}>
                  {selectedPlayer.slice(1)}
                </div>
                <Badge variant="outline" className="text-white border-white/30">
                  {selectedPlayer.startsWith('h') ? 'Home' : 'Away'} Player
                </Badge>
              </div>
            ) : (
              <span className="text-sm text-emerald-400">No player selected</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Instructions */}
      <Card className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border-white/20 text-white">
        <CardHeader className="pb-3">
          <CardTitle className="text-center text-lg">💡 Quick Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-emerald-200">Click a player to select them</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-emerald-200">Click field to move selected player</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-emerald-200">Get close to ball to kick it</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-emerald-200">Score in opponent's goal!</span>
          </div>
        </CardContent>
      </Card>

      {/* Team Colors Legend */}
      <Card className="bg-gradient-to-br from-black/40 to-black/60 backdrop-blur-sm border-white/20 text-white">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="text-center text-sm text-emerald-200 mb-3">Team Colors</div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-team-home rounded-full"></div>
                <span className="text-sm">Home Team</span>
              </div>
              <Badge variant="outline" className="text-white border-team-home/50">
                Blue
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-team-away rounded-full"></div>
                <span className="text-sm">Away Team</span>
              </div>
              <Badge variant="outline" className="text-white border-team-away/50">
                Red
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};