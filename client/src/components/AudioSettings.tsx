import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2, VolumeX, Play } from "lucide-react";
import { AudioManager, type SoundType } from "@/lib/audioManager";

interface AudioSettingsProps {
  soundType: SoundType;
  volume: number;
  soundEnabled: boolean;
  onSoundTypeChange: (soundType: SoundType) => void;
  onVolumeChange: (volume: number) => void;
  onSoundEnabledChange: (enabled: boolean) => void;
  audioManager: AudioManager;
}

export default function AudioSettings({
  soundType,
  volume,
  soundEnabled,
  onSoundTypeChange,
  onVolumeChange,
  onSoundEnabledChange,
  audioManager
}: AudioSettingsProps) {
  const handlePreviewSound = async () => {
    if (soundEnabled) {
      // Ensure audio context is unlocked on user interaction
      await audioManager.ensureUnlocked();
      audioManager.playPreviewSound(soundType);
    }
  };

  const soundOptions = [
    { value: 'gentle' as SoundType, label: 'Gentle Bell' },
    { value: 'chime' as SoundType, label: 'Wind Chime' },
    { value: 'bell' as SoundType, label: 'Temple Bell' },
    { value: 'digital' as SoundType, label: 'Digital Beep' },
  ];

  return (
    <Card className="p-6 w-full max-w-md">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Audio Settings</h3>
          <Button
            data-testid="button-sound-toggle"
            variant="ghost"
            size="icon"
            onClick={() => onSoundEnabledChange(!soundEnabled)}
          >
            {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        {soundEnabled && (
          <>
            <div className="space-y-3">
              <Label htmlFor="sound-type">Notification Sound</Label>
              <div className="flex items-center gap-2">
                <Select value={soundType} onValueChange={onSoundTypeChange}>
                  <SelectTrigger data-testid="select-sound-type">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {soundOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  data-testid="button-preview-sound"
                  variant="outline"
                  size="icon"
                  onClick={handlePreviewSound}
                  className="shrink-0"
                >
                  <Play className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="volume-slider">Volume: {Math.round(volume * 100)}%</Label>
              <Slider
                id="volume-slider"
                data-testid="slider-volume"
                min={0}
                max={1}
                step={0.1}
                value={[volume]}
                onValueChange={([value]) => onVolumeChange(value)}
                className="w-full"
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}