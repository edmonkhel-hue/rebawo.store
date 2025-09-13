import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import TimerDisplay from './TimerDisplay';
import TimeInput from './TimeInput';
import TimerControls from './TimerControls';

export default function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isDark, setIsDark] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const audioRef = useRef<HTMLAudioElement>();

  // Initialize audio
  useEffect(() => {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const createBeepSound = () => {
      if (!audioContext) return;
      
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0, audioContext.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
      gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    };

    if (timeLeft === 0 && totalTime > 0 && soundEnabled) {
      createBeepSound();
    }
  }, [timeLeft, totalTime, soundEnabled]);

  // Dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const calculateTotalSeconds = () => {
    return hours * 3600 + minutes * 60 + seconds;
  };

  const handleTimeChange = (h: number, m: number, s: number) => {
    setHours(h);
    setMinutes(m);
    setSeconds(s);
    
    if (!isRunning) {
      const total = h * 3600 + m * 60 + s;
      setTimeLeft(total);
      setTotalTime(total);
    }
  };

  const handleStart = () => {
    const total = calculateTotalSeconds();
    if (total === 0) return;

    if (!isPaused) {
      setTotalTime(total);
      setTimeLeft(total);
    }
    
    setIsRunning(true);
    setIsPaused(false);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          setIsPaused(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handlePause = () => {
    setIsPaused(true);
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const total = calculateTotalSeconds();
    setTimeLeft(total);
    setTotalTime(total);
  };

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Initialize timeLeft on component mount
  useEffect(() => {
    const total = calculateTotalSeconds();
    setTimeLeft(total);
    setTotalTime(total);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-semibold text-foreground">Focus Timer</h1>
        <Button
          data-testid="button-theme-toggle"
          variant="ghost" 
          size="icon"
          onClick={() => setIsDark(!isDark)}
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <Card className="w-full max-w-2xl p-8 shadow-lg">
          <div className="flex flex-col items-center space-y-8">
            {/* Timer Display */}
            <TimerDisplay
              timeLeft={timeLeft}
              totalTime={totalTime}
              isRunning={isRunning}
            />

            {/* Time Input */}
            <TimeInput
              hours={hours}
              minutes={minutes}
              seconds={seconds}
              onChange={handleTimeChange}
              disabled={isRunning && !isPaused}
            />

            {/* Controls */}
            <TimerControls
              isRunning={isRunning}
              isPaused={isPaused}
              soundEnabled={soundEnabled}
              onStart={handleStart}
              onPause={handlePause}
              onReset={handleReset}
              onToggleSound={handleToggleSound}
              disabled={calculateTotalSeconds() === 0}
            />
          </div>
        </Card>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center">
        <p className="text-sm text-muted-foreground">
          Stay focused, stay productive
        </p>
      </footer>
    </div>
  );
}