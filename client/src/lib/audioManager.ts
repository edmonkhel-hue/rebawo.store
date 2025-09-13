export type SoundType = 'gentle' | 'chime' | 'bell' | 'digital';

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private volume: number = 0.5;
  private isUnlocked: boolean = false;

  constructor() {
    this.initAudioContext();
  }

  private async initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('AudioContext not supported:', error);
    }
  }

  // Ensure audio context is unlocked by playing a silent sound on user interaction
  async ensureUnlocked(): Promise<boolean> {
    if (this.isUnlocked || !this.audioContext) return this.isUnlocked;

    try {
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
      }

      // Play a silent sound to unlock the audio context
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);
      
      gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
      oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
      
      const now = this.audioContext.currentTime;
      oscillator.start(now);
      oscillator.stop(now + 0.01);
      
      this.isUnlocked = true;
      console.log('Audio context unlocked successfully');
      return true;
    } catch (error) {
      console.warn('Failed to unlock audio context:', error);
      return false;
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  getVolume(): number {
    return this.volume;
  }

  async playNotificationSound(soundType: SoundType = 'gentle') {
    if (!this.audioContext) {
      await this.initAudioContext();
    }

    if (!this.audioContext || this.volume === 0) return;

    // Ensure audio context is unlocked
    const unlocked = await this.ensureUnlocked();
    if (!unlocked) {
      console.warn('Audio context could not be unlocked');
      return;
    }

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();
      const filterNode = this.audioContext.createBiquadFilter();

      oscillator.connect(filterNode);
      filterNode.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Configure sound based on type
      switch (soundType) {
        case 'gentle':
          this.createGentleSound(oscillator, gainNode, filterNode);
          break;
        case 'chime':
          this.createChimeSound(oscillator, gainNode, filterNode);
          break;
        case 'bell':
          this.createBellSound(oscillator, gainNode, filterNode);
          break;
        case 'digital':
          this.createDigitalSound(oscillator, gainNode, filterNode);
          break;
      }

      const now = this.audioContext.currentTime;
      oscillator.start(now);
      oscillator.stop(now + this.getSoundDuration(soundType));
    } catch (error) {
      console.warn('Error playing notification sound:', error);
    }
  }

  private createGentleSound(oscillator: OscillatorNode, gainNode: GainNode, filterNode: BiquadFilterNode) {
    const now = this.audioContext!.currentTime;
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440, now);
    oscillator.frequency.linearRampToValueAtTime(880, now + 0.3);
    oscillator.frequency.linearRampToValueAtTime(440, now + 0.6);

    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(2000, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, now + 0.05);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.2, now + 0.3);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.8);
  }

  private createChimeSound(oscillator: OscillatorNode, gainNode: GainNode, filterNode: BiquadFilterNode) {
    const now = this.audioContext!.currentTime;
    
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(523.25, now); // C5
    oscillator.frequency.setValueAtTime(659.25, now + 0.2); // E5
    oscillator.frequency.setValueAtTime(783.99, now + 0.4); // G5

    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(3000, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.4, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.0);
  }

  private createBellSound(oscillator: OscillatorNode, gainNode: GainNode, filterNode: BiquadFilterNode) {
    const now = this.audioContext!.currentTime;
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(800, now);

    filterNode.type = 'bandpass';
    filterNode.frequency.setValueAtTime(800, now);
    filterNode.Q.setValueAtTime(10, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.5, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
  }

  private createDigitalSound(oscillator: OscillatorNode, gainNode: GainNode, filterNode: BiquadFilterNode) {
    const now = this.audioContext!.currentTime;
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(1000, now);
    oscillator.frequency.setValueAtTime(1200, now + 0.1);
    oscillator.frequency.setValueAtTime(1000, now + 0.2);

    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(2000, now);

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.3, now + 0.01);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.3);
  }

  private getSoundDuration(soundType: SoundType): number {
    switch (soundType) {
      case 'gentle': return 0.8;
      case 'chime': return 1.0;
      case 'bell': return 1.2;
      case 'digital': return 0.3;
      default: return 0.8;
    }
  }

  // Play a short preview sound for testing
  async playPreviewSound(soundType: SoundType) {
    this.playNotificationSound(soundType);
  }
}