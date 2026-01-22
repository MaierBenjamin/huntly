import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Haptics } from '@capacitor/haptics';
import { Router } from '@angular/router';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';

@Component({
  selector: 'app-task-sensor',
  templateUrl: './task-wifi.page.html',
  styleUrls: ['./task-wifi.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TaskLayoutComponent]
})
export class TaskWifiPage implements OnInit, OnDestroy {
  statusText: string = 'nicht verbunden';
  hasConnected: boolean = false;
  isFinished: boolean = false;

  remainingTime: number = 120;
  localTimer: string = '02:00';
  timerInterval: any;
  penaltyCount: number = 0;

  networkListener: any;

  taskStatusText = "Löse die Aufgabe";

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  async ngOnInit() {
    this.startTimer();

    const status = await Network.getStatus();
    this.checkWifi(status);

    this.networkListener = await Network.addListener('networkStatusChange', (status) => {
      this.ngZone.run(() => {
        this.checkWifi(status);
      });
    });
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;
        this.formatTime();
      } else {
        this.penaltyCount++;
        console.log('Zeit abgelaufen! Penalty erhöht auf:', this.penaltyCount);
        this.stopTimer();
      }
      this.cdr.detectChanges();
    }, 1000);
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

  checkWifi(status: ConnectionStatus) {
    const isWifi = status.connected && status.connectionType === 'wifi';

    if (isWifi) {
      this.statusText = 'verbunden';
      this.hasConnected = true;
    } else {
      this.statusText = 'nicht verbunden';
      if (this.hasConnected && !this.isFinished) {
        this.triggerSuccess();
      }
    }
    this.cdr.detectChanges();
  }

  async triggerSuccess() {
    this.isFinished = true;
    this.stopTimer();
    this.taskStatusText = "Aufgabe erledigt";
    await Haptics.notification({ type: 'success' as any });
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    this.stopTimer();
    if (this.networkListener) {
      this.networkListener.remove();
    }
  }

  completeTask() {
    this.router.navigate(['/taskboard']);
  }
}
