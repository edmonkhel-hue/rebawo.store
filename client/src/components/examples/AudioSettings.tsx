import { useState } from 'react';
import AudioSettings from '../AudioSettings';
import { AudioManager, type SoundType } from '@/lib/audioManager';

const audioManager = new AudioManager();

export default function AudioSettingsExample() {
  const [soundType, setSoundType] = useState<SoundType>('gentle');
  const [volume, setVolume] = useState(0.5);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const handleSoundTypeChange = (newSoundType: SoundType) => {
    console.log('Sound type changed:', newSoundType);
    setSoundType(newSoundType);
  };

  const handleVolumeChange = (newVolume: number) => {
    console.log('Volume changed:', newVolume);
    setVolume(newVolume);
    audioManager.setVolume(newVolume);
  };

  const handleSoundEnabledChange = (enabled: boolean) => {
    console.log('Sound enabled changed:', enabled);
    setSoundEnabled(enabled);
  };

  return (
    <div className="p-8 bg-background min-h-screen flex items-center justify-center">
      <AudioSettings
        soundType={soundType}
        volume={volume}
        soundEnabled={soundEnabled}
        onSoundTypeChange={handleSoundTypeChange}
        onVolumeChange={handleVolumeChange}
        onSoundEnabledChange={handleSoundEnabledChange}
        audioManager={audioManager}
      />
    </div>
  );
}