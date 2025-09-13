import { useState } from 'react';
import PresetButtons from '../PresetButtons';

export default function PresetButtonsExample() {
  const [selectedTime, setSelectedTime] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);

  const handlePresetSelect = (hours: number, minutes: number, seconds: number) => {
    console.log('Preset selected:', { hours, minutes, seconds });
    setSelectedTime({ hours, minutes, seconds });
  };

  return (
    <div className="p-8 bg-background min-h-screen flex flex-col items-center justify-center gap-6">
      <PresetButtons onPresetSelect={handlePresetSelect} disabled={false} />
      
      {selectedTime && (
        <div className="text-center p-4 bg-card rounded-lg border">
          <p className="text-muted-foreground text-sm">Selected time:</p>
          <p className="font-mono text-lg">
            {selectedTime.hours.toString().padStart(2, '0')}:
            {selectedTime.minutes.toString().padStart(2, '0')}:
            {selectedTime.seconds.toString().padStart(2, '0')}
          </p>
        </div>
      )}
    </div>
  );
}