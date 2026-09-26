class SpatialAudioEngine {
  constructor() {
    this.ctx = null;
    let saved = null;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        saved = localStorage.getItem('spatial_audio_enabled');
      }
    } catch {
      // Storage access fallback
    }
    // Default turned ON on visit unless explicitly muted
    this.enabled = saved !== null ? saved === 'true' : true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('spatial_audio_enabled', String(this.enabled));
      }
    } catch {
      // Storage access fallback
    }
    if (this.enabled) {
      this.init();
      this.playModeToggle(true);
    }
    return this.enabled;
  }

  playHoverTone() {
    if (!this.enabled || !this.ctx) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(620, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(840, this.ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.06);
    } catch {
      // Audio fallback silent
    }
  }

  playClickChime() {
    if (!this.enabled || !this.ctx) return;
    try {
      this.init();
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 triad
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.03);

        gain.gain.setValueAtTime(0.02, this.ctx.currentTime + idx * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.03 + 0.15);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.03);
        osc.stop(this.ctx.currentTime + idx * 0.03 + 0.15);
      });
    } catch {
      // Audio fallback silent
    }
  }

  playModeToggle(isTurningOn) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      const startF = isTurningOn ? 380 : 720;
      const endF = isTurningOn ? 720 : 380;
      osc.frequency.setValueAtTime(startF, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(endF, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio fallback silent
    }
  }

  playModalOpen() {
    if (!this.enabled || !this.ctx) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(540, this.ctx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch {
      // Audio fallback silent
    }
  }

  playModalClose() {
    if (!this.enabled || !this.ctx) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(540, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 0.14);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch {
      // Audio fallback silent
    }
  }
}

export const audioEngine = new SpatialAudioEngine();

// Auto-unlock Web Audio context on the user's first gesture
if (typeof window !== 'undefined') {
  const unlockAudio = () => {
    if (audioEngine.enabled) {
      audioEngine.init();
    }
    ['pointerdown', 'touchstart', 'keydown', 'scroll'].forEach((evt) => {
      window.removeEventListener(evt, unlockAudio);
    });
  };
  ['pointerdown', 'touchstart', 'keydown', 'scroll'].forEach((evt) => {
    window.addEventListener(evt, unlockAudio, { passive: true, once: true });
  });
}
