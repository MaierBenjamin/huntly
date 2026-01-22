import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';
import { Haptics } from '@capacitor/haptics';

@Component({
  selector: 'app-task-gps',
  templateUrl: './task-gps.page.html',
  styleUrls: ['./task-gps.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TaskLayoutComponent]
})
export class TaskGpsPage implements OnInit, OnDestroy {
  distance: number = 999;
  watchId: string | null = null;
  hasVibrated: boolean = false;
  isFinished: boolean = false; 

  remainingTime: number = 120; 
  localTimer: string = '02:00';
  timerInterval: any;
  penaltyCount: number = 0; 

  readonly target = {
    lat: 47.027083,
    lng: 8.301139
  };

  readonly TOLERANCE_METERS = 5;

  constructor(
    private router: Router, 
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.startTimer();
    await this.startTracking();
  }

  ngOnDestroy() {
    this.stopTracking();
    this.stopTimer();
  }

  completeTask() {
    if (this.distance <= this.TOLERANCE_METERS) {
      this.stopTracking();
      this.stopTimer();
      this.router.navigate(['/task-walk']);
    } else {
      Haptics.vibrate();
      console.log('Du bist noch zu weit weg!');
    }
  }

  nextTask() {
    this.router.navigate(['/task-walk']);
  }

  abortGame() {
    this.stopTracking();
    this.router.navigate(['/home']);
  }

  async startTracking() {
    const permissions = await Geolocation.requestPermissions();

    if (permissions.location === 'granted') {
      this.watchId = await Geolocation.watchPosition({
        enableHighAccuracy: true,
      }, (position) => {
        this.ngZone.run(async () => {
          if (position) {
            const d = this.calculateDistance(
              position.coords.latitude,
              position.coords.longitude,
              this.target.lat,
              this.target.lng
            );

            this.distance = Math.round(d);
            if (this.distance <= this.TOLERANCE_METERS) {
              this.isFinished = true; 
              
              if (!this.hasVibrated) {
                await Haptics.notification({ type: 'success' as any });
                this.hasVibrated = true;
              }
            } else {
              this.isFinished = false;
            }
            
            this.cdr.detectChanges();
          }
        });
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

  startTimer() {
    this.ngZone.run(() => {
      this.timerInterval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
          this.formatTime();
        } else {
          this.penaltyCount++;
          this.stopTimer();
        }
        this.cdr.detectChanges();
      }, 1000);
    });
  }

  formatTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    this.localTimer = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}