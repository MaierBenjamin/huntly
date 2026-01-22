import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Network, ConnectionStatus } from '@capacitor/network';
import { Haptics } from '@capacitor/haptics';
import { Router } from '@angular/router';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';
import { GameService } from '../../services/game.service'; // WICHTIG

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
  networkListener: any;

  taskStatusText = "Löse die Aufgabe";

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public gameService: GameService
  ) {}

  async ngOnInit() {
    const status = await Network.getStatus();
    this.checkWifi(status);

    this.networkListener = await Network.addListener('networkStatusChange', (status) => {
      this.ngZone.run(() => {
        this.checkWifi(status);
      });
    });
  }

  ngOnDestroy() {
    if (this.networkListener) {
      this.networkListener.remove();
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
    this.taskStatusText = "Aufgabe erledigt";
    await Haptics.notification({ type: 'success' as any });
    this.cdr.detectChanges();
  }

  onFinish(isTimerExpired: boolean) {
    this.router.navigate(['/taskboard']);
  }

  onSkip() {
    this.gameService.addKartoffel();
    this.router.navigate(['/taskboard']);
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
