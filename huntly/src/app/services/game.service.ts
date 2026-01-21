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
