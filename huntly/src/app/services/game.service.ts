import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export interface Task {
  title: string;
  description: string;
  type: 'geolocation' | 'distance' | 'qr' | 'wifi';
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  playerName: string = 'Test Benutzer';
  currentTaskIndex: number = 0;
  schnitzelCount: number = 0;
  kartoffelCount: number = 0;

  totalSeconds: number = 0;
  private timerInterval: any;


  startGameTimer() {
    if (this.timerInterval) return;
    this.totalSeconds = 0;
    this.timerInterval = setInterval(() => {
      this.totalSeconds++;
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timerInterval);
    this.timerInterval = null;
  }


  getFormattedTime(): string {
    const mins = Math.floor(this.totalSeconds / 60);
    const secs = this.totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  addSchnitzel() {
    this.schnitzelCount++;
  }

  addKartoffel() {
    this.kartoffelCount++;
  }

  resetGame() {
    this.schnitzelCount = 0;
    this.kartoffelCount = 0;
  }

  tasks: Task[] = [
    { title: 'Begebe dich zum Kühlschrank', description: 'Suche den grössten Kühlschrank im Raum.', type: 'geolocation' },
    { title: 'Laufe 10 Meter', description: 'Bewege dich ein bisschen!', type: 'distance' },
    { title: 'Scanne den QR-Code', description: 'Suche den Code an der Wand.', type: 'qr' },
    { title: 'WLAN Challenge', description: 'Verbinde dich mit dem ICT-KR6 Wlan.', type: 'wifi' }
  ];

  async taskCompleted() {
    await Haptics.impact({ style: ImpactStyle.Medium });
    this.currentTaskIndex++;
  }
}
