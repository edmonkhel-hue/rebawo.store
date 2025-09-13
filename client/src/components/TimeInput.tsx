import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TimeInputProps {
  hours: number;
  minutes: number;
  seconds: number;
  onChange: (hours: number, minutes: number, seconds: number) => void;
  disabled?: boolean;
}

export default function TimeInput({ hours, minutes, seconds, onChange, disabled = false }: TimeInputProps) {
  const handleChange = (type: 'hours' | 'minutes' | 'seconds', value: string) => {
    const numValue = Math.max(0, Math.min(parseInt(value) || 0, type === 'hours' ? 23 : 59));
    
    if (type === 'hours') {
      onChange(numValue, minutes, seconds);
    } else if (type === 'minutes') {
      onChange(hours, numValue, seconds);
    } else {
      onChange(hours, minutes, numValue);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 mb-8">
      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="hours-input" className="text-sm text-muted-foreground">Hours</Label>
        <Input
          id="hours-input"
          data-testid="input-hours"
          type="number"
          min="0"
          max="23"
          value={hours.toString().padStart(2, '0')}
          onChange={(e) => handleChange('hours', e.target.value)}
          disabled={disabled}
          className="w-20 h-14 text-2xl text-center font-mono"
        />
      </div>
      
      <div className="text-3xl text-muted-foreground mt-6">:</div>
      
      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="minutes-input" className="text-sm text-muted-foreground">Minutes</Label>
        <Input
          id="minutes-input"
          data-testid="input-minutes"
          type="number"
          min="0"
          max="59"
          value={minutes.toString().padStart(2, '0')}
          onChange={(e) => handleChange('minutes', e.target.value)}
          disabled={disabled}
          className="w-20 h-14 text-2xl text-center font-mono"
        />
      </div>
      
      <div className="text-3xl text-muted-foreground mt-6">:</div>
      
      <div className="flex flex-col items-center gap-2">
        <Label htmlFor="seconds-input" className="text-sm text-muted-foreground">Seconds</Label>
        <Input
          id="seconds-input"
          data-testid="input-seconds"
          type="number"
          min="0"
          max="59"
          value={seconds.toString().padStart(2, '0')}
          onChange={(e) => handleChange('seconds', e.target.value)}
          disabled={disabled}
          className="w-20 h-14 text-2xl text-center font-mono"
        />
      </div>
    </div>
  );
}