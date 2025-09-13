import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Moon, Sun, Settings } from "lucide-react";
import TimerDisplay from './TimerDisplay';
import TimeInput from './TimeInput';
import TimerControls from './TimerControls';
import PresetButtons from './PresetButtons';
import AudioSettings from './AudioSettings';
import KeyboardShortcutsHelp from './KeyboardShortcutsHelp';
import { AudioManager, type SoundType } from '@/lib/audioManager';
import { TimerStorage, type TimerSettings, type TimerSession } from '@/lib/timerStorage';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [soundType, setSoundType] = useState<SoundType>('gentle');
  const [volume, setVolume] = useState(0.5);
  const [isDark, setIsDark] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout>();
  const audioManagerRef = useRef<AudioManager>();
  const notificationSentRef = useRef<boolean>(false);

  // Initialize audio manager and load saved settings
  useEffect(() => {
    audioManagerRef.current = new AudioManager();
    
    // Load saved settings
    const savedSettings = TimerStorage.loadSettings();
    if (savedSettings) {
      setHours(savedSettings.hours);
      setMinutes(savedSettings.minutes);
      setSeconds(savedSettings.seconds);
      setSoundEnabled(savedSettings.soundEnabled);
      setSoundType(savedSettings.soundType);
      setVolume(savedSettings.volume);
      setIsDark(savedSettings.isDark);
      
      audioManagerRef.current.setVolume(savedSettings.volume);
      
      // Set initial timer display
      const total = savedSettings.hours * 3600 + savedSettings.minutes * 60 + savedSettings.seconds;
      setTimeLeft(total);
      setTotalTime(total);
    } else {
      audioManagerRef.current.setVolume(volume);
      // Set initial timer display with default values
      const total = hours * 3600 + minutes * 60 + seconds;
      setTimeLeft(total);
      setTotalTime(total);
    }

    // Check for resumable session
    const resumableSession = TimerStorage.getResumedSession();
    if (resumableSession) {
      setTimeLeft(resumableSession.timeLeft);
      setTotalTime(resumableSession.totalTime);
      setIsRunning(resumableSession.isRunning);
      setIsPaused(resumableSession.isPaused);
      
      // If the session was completed while away, trigger completion
      if (resumableSession.timeLeft === 0 && resumableSession.totalTime > 0) {
        notificationSentRef.current = false; // Allow notification for completed session
      }

      // Resume timer if it was running
      if (resumableSession.isRunning) {
        intervalRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              setIsRunning(false);
              setIsPaused(false);
              TimerStorage.clearSession();
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
    }
  }, []);

  // Update volume when it changes
  useEffect(() => {
    if (audioManagerRef.current) {
      audioManagerRef.current.setVolume(volume);
    }
  }, [volume]);

  // Play notification when timer ends (one-shot)
  useEffect(() => {
    if (timeLeft === 0 && totalTime > 0 && soundEnabled && audioManagerRef.current && !notificationSentRef.current) {
      audioManagerRef.current.playNotificationSound(soundType);
      notificationSentRef.current = true;
    }
  }, [timeLeft, totalTime, soundEnabled, soundType]);

  // Dark mode toggle
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Save settings whenever they change
  useEffect(() => {
    const settings: TimerSettings = {
      hours,
      minutes,
      seconds,
      soundEnabled,
      soundType,
      volume,
      isDark
    };
    TimerStorage.saveSettings(settings);
  }, [hours, minutes, seconds, soundEnabled, soundType, volume, isDark]);

  // Save session when timer state changes (optimized - not every second)
  useEffect(() => {
    if (isRunning && !isPaused) {
      const session: TimerSession = {
        timeLeft,
        totalTime,
        isRunning,
        isPaused,
        targetEndTime: Date.now() + (timeLeft * 1000)
      };
      TimerStorage.saveSession(session);
    } else if (isPaused) {
      const session: TimerSession = {
        timeLeft,
        totalTime,
        isRunning: false,
        isPaused: true,
        targetEndTime: Date.now() + (timeLeft * 1000),
        pausedAt: Date.now()
      };
      TimerStorage.saveSession(session);
    } else if (!isRunning && !isPaused) {
      TimerStorage.clearSession();
    }
  }, [isRunning, isPaused]); // Only save when state changes, not every second

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

  const handleStart = async () => {
    const total = calculateTotalSeconds();
    if (total === 0) return;

    // Unlock audio context on user interaction
    if (audioManagerRef.current) {
      await audioManagerRef.current.ensureUnlocked();
    }

    // Clear any existing interval to prevent multiple intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!isPaused) {
      setTotalTime(total);
      setTimeLeft(total);
      notificationSentRef.current = false; // Reset notification flag for new timer
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
    notificationSentRef.current = false; // Reset notification flag
  };

  const handleToggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const handleSoundTypeChange = (newSoundType: SoundType) => {
    setSoundType(newSoundType);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handlePresetSelect = (h: number, m: number, s: number) => {
    if (!isRunning) {
      setHours(h);
      setMinutes(m);
      setSeconds(s);
      
      const total = h * 3600 + m * 60 + s;
      setTimeLeft(total);
      setTotalTime(total);
    }
  };

  const handleToggleTimer = () => {
    if (isRunning || isPaused) {
      if (isRunning) {
        handlePause();
      } else {
        handleStart();
      }
    } else if (calculateTotalSeconds() > 0) {
      handleStart();
    }
  };

  const handleToggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleCloseSettings = () => {
    setShowSettings(false);
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    onToggleTimer: handleToggleTimer,
    onReset: handleReset,
    onToggleSettings: handleToggleSettings,
    onCloseSettings: handleCloseSettings,
    disabled: false
  });

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-semibold text-foreground">Focus Timer</h1>
        <div className="flex items-center gap-2">
          <KeyboardShortcutsHelp />
          <Dialog open={showSettings} onOpenChange={setShowSettings}>
            <DialogTrigger asChild>
              <Button
                data-testid="button-audio-settings"
                variant="ghost"
                size="icon"
                onClick={async () => {
                  // Unlock audio context when opening settings
                  if (audioManagerRef.current) {
                    await audioManagerRef.current.ensureUnlocked();
                  }
                }}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              {audioManagerRef.current && (
                <AudioSettings
                  soundType={soundType}
                  volume={volume}
                  soundEnabled={soundEnabled}
                  onSoundTypeChange={handleSoundTypeChange}
                  onVolumeChange={handleVolumeChange}
                  onSoundEnabledChange={setSoundEnabled}
                  audioManager={audioManagerRef.current}
                />
              )}
            </DialogContent>
          </Dialog>
          <Button
            data-testid="button-theme-toggle"
            variant="ghost" 
            size="icon"
            onClick={() => setIsDark(!isDark)}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
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

            {/* Preset Buttons */}
            <PresetButtons
              onPresetSelect={handlePresetSelect}
              disabled={isRunning && !isPaused}
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