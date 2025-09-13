import { CheckCircle } from "lucide-react";

interface TimerDisplayProps {
  timeLeft: number; // in seconds
  totalTime: number; // in seconds
  isRunning: boolean;
  isCompleted?: boolean;
}

export default function TimerDisplay({ timeLeft, totalTime, isRunning, isCompleted = false }: TimerDisplayProps) {
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
  
  // Simple completion state (no excessive animations)
  const isCompletionState = isCompleted && timeLeft === 0 && totalTime > 0;

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
            className={`transition-all duration-1000 ease-out ${
              isCompletionState ? 'motion-safe:animate-pulse' : ''
            }`}
          />
        </svg>
        
        {/* Timer Display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div 
            className={`font-mono text-6xl font-light transition-all duration-500 ${
              isRunning 
                ? 'motion-safe:scale-[1.02] text-foreground' 
                : isCompletionState 
                  ? 'text-primary' 
                  : 'text-foreground'
            }`}
            data-testid="text-timer-display"
          >
            {formatTime(timeLeft)}
          </div>
          <div className={`flex items-center gap-2 text-lg mt-2 transition-all duration-300 ${
            isCompletionState 
              ? 'text-primary font-medium' 
              : 'text-muted-foreground'
          }`} data-testid="text-timer-status">
            {isCompletionState && (
              <CheckCircle className="w-5 h-5" data-testid="icon-completion" />
            )}
            <span>
              {isRunning ? 'Running' : isCompletionState ? 'Complete!' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="w-80 bg-muted rounded-full h-2 overflow-hidden" data-testid="progress-bar">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ease-out ${
            isCompletionState 
              ? 'bg-primary motion-safe:animate-pulse' 
              : 'bg-primary'
          }`}
          style={{ width: `${progress}%` }}
          data-testid="progress-fill"
        ></div>
      </div>
    </div>
  );
}