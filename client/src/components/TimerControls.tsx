import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  soundEnabled: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
  onToggleSound: () => void;
  disabled?: boolean;
}

export default function TimerControls({ 
  isRunning, 
  isPaused, 
  soundEnabled,
  onStart, 
  onPause, 
  onReset,
  onToggleSound,
  disabled = false 
}: TimerControlsProps) {
  return (
    <div className="flex items-center justify-center gap-4">
      {/* Main control button */}
      {!isRunning || isPaused ? (
        <Button
          data-testid="button-start"
          size="lg" 
          onClick={onStart}
          disabled={disabled}
          className="h-14 px-8 text-lg"
        >
          <Play className="w-5 h-5 mr-2" />
          {isPaused ? 'Resume' : 'Start'}
        </Button>
      ) : (
        <Button
          data-testid="button-pause"
          variant="secondary" 
          size="lg"
          onClick={onPause}
          disabled={disabled}
          className="h-14 px-8 text-lg"
        >
          <Pause className="w-5 h-5 mr-2" />
          Pause
        </Button>
      )}

      {/* Reset button */}
      <Button
        data-testid="button-reset"
        variant="outline"
        size="lg"
        onClick={onReset}
        disabled={disabled}
        className="h-14 px-6"
      >
        <RotateCcw className="w-5 h-5 mr-2" />
        Reset
      </Button>

      {/* Sound toggle */}
      <Button
        data-testid="button-sound-toggle"
        variant="ghost"
        size="icon"
        onClick={onToggleSound}
        className="h-14 w-14"
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <VolumeX className="w-5 h-5" />
        )}
      </Button>
    </div>
  );
}