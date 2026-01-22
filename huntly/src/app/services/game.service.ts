import { Injectable } from '@angular/core';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

export interface GameResult {
  playerName: string;
  date: string;
  totalTime: string;
  schnitzel: number;
  kartoffeln: number;
}

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
  private readonly STORAGE_KEY = 'huntly_history';

  startGameTimer() {
    if (this.timerInterval) return;
    this.totalSeconds = 0;
    this.timerInterval = setInterval(() => {
      this.totalSeconds++;
    }, 1000);
  }

  stopGameTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  getFormattedTime(): string {
    const mins = Math.floor(this.totalSeconds / 60);
    const secs = this.totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  handleTaskFinished(isExpired: boolean) {
    this.schnitzelCount++;

    if (isExpired) {
      this.kartoffelCount++;
    }
  }


  handleTaskSkipped() {
    this.kartoffelCount++;
  }

  resetGame() {
    this.schnitzelCount = 0;
    this.kartoffelCount = 0;
    this.totalSeconds = 0;
    this.currentTaskIndex = 0;
    this.stopGameTimer();
  }

  saveCurrentGame() {
    const history = this.getHistory();

    const newResult: GameResult = {
      playerName: this.playerName || 'Anonym',
      date: new Date().toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      totalTime: this.getFormattedTime(),
      schnitzel: this.schnitzelCount,
      kartoffeln: this.kartoffelCount
    };

    history.unshift(newResult);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(history.slice(0, 10)));

    this.resetGame();
  }

  getHistory(): GameResult[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  clearHistory() {
    localStorage.removeItem(this.STORAGE_KEY);
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
