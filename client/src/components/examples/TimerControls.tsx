import { useState } from 'react';
import TimerControls from '../TimerControls';

export default function TimerControlsExample() {
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleStart = () => {
    console.log('Start clicked');
    setIsRunning(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    console.log('Pause clicked');
    setIsPaused(true);
  };

  const handleReset = () => {
    console.log('Reset clicked');
    setIsRunning(false);
    setIsPaused(false);
  };

  const handleToggleSound = () => {
    console.log('Sound toggle clicked');
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="p-8 bg-background min-h-screen flex items-center justify-center">
      <TimerControls
        isRunning={isRunning}
        isPaused={isPaused}
        soundEnabled={soundEnabled}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
        onToggleSound={handleToggleSound}
        disabled={false}
      />
    </div>
  );
}