import { type SoundType } from './audioManager';

export interface TimerSettings {
  hours: number;
  minutes: number;
  seconds: number;
  soundEnabled: boolean;
  soundType: SoundType;
  volume: number;
  isDark: boolean;
}

export interface TimerSession {
  timeLeft: number;
  totalTime: number;
  isRunning: boolean;
  isPaused: boolean;
  targetEndTime: number; // timestamp when timer should complete
  pausedAt?: number; // timestamp when timer was paused (for paused sessions)
}

const SETTINGS_KEY = 'focus-timer-settings';
const SESSION_KEY = 'focus-timer-session';

export class TimerStorage {
  static saveSettings(settings: TimerSettings): void {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.warn('Failed to save timer settings:', error);
    }
  }

  static loadSettings(): TimerSettings | null {
    try {
      const stored = localStorage.getItem(SETTINGS_KEY);
      if (stored) {
        const settings = JSON.parse(stored);
        // Validate the settings have required properties
        if (this.isValidSettings(settings)) {
          return settings;
        }
      }
    } catch (error) {
      console.warn('Failed to load timer settings:', error);
    }
    return null;
  }

  static saveSession(session: TimerSession): void {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch (error) {
      console.warn('Failed to save timer session:', error);
    }
  }

  static loadSession(): TimerSession | null {
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (stored) {
        const session = JSON.parse(stored);
        if (this.isValidSession(session)) {
          return session;
        }
      }
    } catch (error) {
      console.warn('Failed to load timer session:', error);
    }
    return null;
  }

  static clearSession(): void {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (error) {
      console.warn('Failed to clear timer session:', error);
    }
  }

  static getResumedSession(): TimerSession | null {
    const session = this.loadSession();
    if (!session) {
      return null;
    }

    const now = Date.now();

    // Handle paused sessions
    if (session.isPaused && session.pausedAt) {
      // Return paused session as-is (time doesn't advance when paused)
      return session;
    }

    // Handle running sessions
    if (session.isRunning && session.targetEndTime) {
      const timeLeft = Math.max(0, Math.ceil((session.targetEndTime - now) / 1000));
      
      // If the timer should have completed while away
      if (timeLeft === 0) {
        this.clearSession(); // Clean up expired session
        return {
          ...session,
          timeLeft: 0,
          isRunning: false,
          isPaused: false
        };
      }

      // Return the session with updated time
      return {
        ...session,
        timeLeft
      };
    }

    // For stopped sessions, return null to let normal initialization happen
    return null;
  }

  private static isValidSettings(obj: any): obj is TimerSettings {
    return obj &&
      typeof obj.hours === 'number' &&
      typeof obj.minutes === 'number' &&
      typeof obj.seconds === 'number' &&
      typeof obj.soundEnabled === 'boolean' &&
      typeof obj.soundType === 'string' &&
      typeof obj.volume === 'number' &&
      typeof obj.isDark === 'boolean';
  }

  private static isValidSession(obj: any): obj is TimerSession {
    return obj &&
      typeof obj.timeLeft === 'number' &&
      typeof obj.totalTime === 'number' &&
      typeof obj.isRunning === 'boolean' &&
      typeof obj.isPaused === 'boolean' &&
      typeof obj.targetEndTime === 'number' &&
      (obj.pausedAt === undefined || typeof obj.pausedAt === 'number');
  }
}