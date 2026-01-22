import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { Router } from '@angular/router';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';
import { Haptics } from '@capacitor/haptics';
import { GameService } from '../../services/game.service';

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
  taskStatusText = "Löse die Aufgabe";

  readonly target = {
    lat: 47.027083,
    lng: 8.301139
  };

  readonly TOLERANCE_METERS = 5;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public gameService: GameService
  ) {}

  async ngOnInit() {
    await this.startTracking();
  }

  ngOnDestroy() {
    this.stopTracking();
  }


  onFinish(isTimerExpired: boolean) {
    this.gameService.handleTaskFinished(isTimerExpired);

    this.stopTracking();
    this.router.navigate(['/task-walk']);
  }

  onSkip() {
    this.gameService.handleTaskSkipped();

    this.stopTracking();
    this.router.navigate(['/task-walk']);
  }


  onCancel() {
    this.stopTracking();
    this.gameService.resetGame();
    this.router.navigate(['/home']);
  }

  async startTracking() {
    try {
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
                  this.taskStatusText = "Aufgabe erledigt";
                }
              } else {
                this.isFinished = false;
              }

              this.cdr.detectChanges();
            }
          });
        });
      }
    } catch (e) {
      console.error('GPS Tracking Fehler:', e);
    }
  }

  stopTracking() {
    if (this.watchId) {
      Geolocation.clearWatch({ id: this.watchId });
      this.watchId = null;
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
