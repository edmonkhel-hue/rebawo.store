import { useEffect } from 'react';

interface KeyboardShortcuts {
  onToggleTimer: () => void;
  onReset: () => void;
  onToggleSettings?: () => void;
  onCloseSettings?: () => void;
  disabled?: boolean;
}

export function useKeyboardShortcuts({ 
  onToggleTimer, 
  onReset, 
  onToggleSettings,
  onCloseSettings,
  disabled = false 
}: KeyboardShortcuts) {
  useEffect(() => {
    if (disabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      const target = event.target as HTMLElement;
      const isInputFocused = target.tagName === 'INPUT' || 
                            target.tagName === 'TEXTAREA' || 
                            target.isContentEditable ||
                            (target.closest && target.closest('[role="dialog"]') !== null); // Ignore when modal is open

      if (isInputFocused) return;

      // Prevent default behavior for our shortcuts
      const key = event.key.toLowerCase();
      const isModified = event.ctrlKey || event.metaKey || event.altKey;

      switch (key) {
        case ' ':
        case 'spacebar':
          if (!isModified) {
            event.preventDefault();
            onToggleTimer();
          }
          break;
        
        case 'r':
          if (!isModified) {
            event.preventDefault();
            onReset();
          }
          break;

        case 's':
          if (onToggleSettings && !isModified) {
            event.preventDefault();
            onToggleSettings();
          }
          break;

        case 'escape':
          // Close settings if they're open
          if (onCloseSettings) {
            onCloseSettings();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onToggleTimer, onReset, onToggleSettings, onCloseSettings, disabled]);
}