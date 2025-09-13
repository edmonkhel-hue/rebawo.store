import { Circle } from "lucide-react";

interface TimerDisplayProps {
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
  isRunning: boolean;
}

export default function TimerDisplay({ timeLeft, totalTime, isRunning }: TimerDisplayProps) {
  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;
  const circumference = 2 * Math.PI * 120; // radius of 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Progress Ring */}
      <div className="relative w-80 h-80 mb-8">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
          />
          {/* Progress circle */}
          <circle
            cx="128"
            cy="128"
            r="120"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        
        {/* Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className={`font-mono text-6xl font-light text-foreground transition-all duration-300 ${
              isRunning ? 'scale-105' : 'scale-100'
            }`}
            data-testid="text-timer-display"
          >
            {formatTime(timeLeft)}
          </div>
          <div className="text-muted-foreground text-lg mt-2">
            {isRunning ? 'Running' : timeLeft === 0 ? 'Time\'s up!' : 'Ready'}
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="w-80 bg-muted rounded-full h-2">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}