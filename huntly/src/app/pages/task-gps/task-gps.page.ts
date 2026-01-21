import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-task-gps',
  templateUrl: './task-gps.page.html',
  styleUrls: ['./task-gps.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TaskGpsPage implements OnInit, OnDestroy {
  distance: number = 999; 
  watchId: string | null = null;

readonly target = {
  lat: 47.027139, 
  lng: 8.301083
};

  async ngOnInit() {
    await this.startTracking();
  }

  ngOnDestroy() {
    this.stopTracking();
  }

  async startTracking() {
    const permissions = await Geolocation.requestPermissions();
    
    if (permissions.location === 'granted') {
      this.watchId = await Geolocation.watchPosition({
        enableHighAccuracy: true, 
      }, (position) => {
        if (position) {
          const d = this.calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            this.target.lat,
            this.target.lng
          );
          
          this.distance = d < 5 ? 0 : Math.round(d);
        }
      });
    }
  }

  stopTracking() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
    }
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; 
    const phi1 = lat1 * Math.PI / 180;
    const phi2 = lat2 * Math.PI / 180;
    const deltaPhi = (lat2 - lat1) * Math.PI / 180;
    const deltaLambda = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
              Math.cos(phi1) * Math.cos(phi2) *
              Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; 
  }
}