import { useState } from 'react';
import { Button } from '@/components/ui/button';
import TimerDisplay from '../TimerDisplay';

export default function TimerDisplayExample() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  return (
    <div className="p-8 bg-background min-h-screen flex flex-col items-center justify-center gap-4">
      <TimerDisplay 
        timeLeft={isCompleted ? 0 : 1547} // 25:47 or 0
        totalTime={1800} // 30:00
        isRunning={isRunning}
        isCompleted={isCompleted}
      />
      <div className="flex gap-2">
        <Button onClick={() => setIsCompleted(!isCompleted)}>
          {isCompleted ? 'Reset' : 'Complete'}
        </Button>
        <Button onClick={() => setIsRunning(!isRunning)} variant="outline">
          {isRunning ? 'Pause' : 'Start'}
        </Button>
      </div>
    </div>
  );
}