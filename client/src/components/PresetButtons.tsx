import { Button } from "@/components/ui/button";

interface PresetButtonsProps {
  onPresetSelect: (hours: number, minutes: number, seconds: number) => void;
  disabled?: boolean;
}

interface PresetTimer {
  label: string;
  hours: number;
  minutes: number;
  seconds: number;
  description: string;
}

const presets: PresetTimer[] = [
  { label: "5 min", hours: 0, minutes: 5, seconds: 0, description: "Quick break" },
  { label: "15 min", hours: 0, minutes: 15, seconds: 0, description: "Short focus session" },
  { label: "25 min", hours: 0, minutes: 25, seconds: 0, description: "Pomodoro technique" },
  { label: "45 min", hours: 0, minutes: 45, seconds: 0, description: "Deep work session" },
  { label: "1 hour", hours: 1, minutes: 0, seconds: 0, description: "Long focus block" },
];

export default function PresetButtons({ onPresetSelect, disabled = false }: PresetButtonsProps) {
  const handlePresetClick = (preset: PresetTimer) => {
    if (!disabled) {
      onPresetSelect(preset.hours, preset.minutes, preset.seconds);
    }
  };

  return (
    <div className="w-full">
      <div className="text-center mb-4">
        <p className="text-sm text-muted-foreground">Quick presets</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {presets.map((preset) => (
          <Button
            key={preset.label}
            data-testid={`button-preset-${preset.label.replace(' ', '-')}`}
            variant="outline"
            size="sm"
            onClick={() => handlePresetClick(preset)}
            disabled={disabled}
            className="flex flex-col h-auto py-3 px-2 gap-1 hover-elevate"
            title={preset.description}
          >
            <span className="font-semibold text-sm">{preset.label}</span>
            <span className="text-xs text-muted-foreground leading-tight">
              {preset.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}