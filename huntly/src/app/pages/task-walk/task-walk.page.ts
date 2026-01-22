import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Motion } from '@capacitor/motion';
import { Haptics } from '@capacitor/haptics';
import { Router } from '@angular/router';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';
import { GameService } from '../../services/game.service'; // WICHTIG

@Component({
  selector: 'app-task-walk',
  templateUrl: './task-walk.page.html',
  styleUrls: ['./task-walk.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TaskLayoutComponent]
})
export class TaskWalkPage implements OnInit, OnDestroy {
  stepsDone: number = 0;
  stepsTarget: number = 15;
  isFinished: boolean = false;

  taskStatusText = "Löse die Aufgabe";


  private accelListener: any;
  private isThrottled: boolean = false;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public gameService: GameService
  ) {}

  async ngOnInit() {
    this.startMotionTracking();
  }

  ngOnDestroy() {
    this.stopMotionTracking();
  }

  onFinish(isTimerExpired: boolean) {

  this.stopMotionTracking();
  this.router.navigate(['/task-qr']);
  }

  onSkip() {
    this.gameService.addKartoffel();
    this.stopMotionTracking();
    this.router.navigate(['/task-qr']);
  }

  onCancel() {
    this.stopMotionTracking();
    this.router.navigate(['/home']);
  }

  async startMotionTracking() {
    try {
      if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
        await (DeviceMotionEvent as any).requestPermission();
      }

      this.accelListener = await Motion.addListener('accel', (event) => {
        this.ngZone.run(() => {
          const acc = event.acceleration;
          if (!acc) return;

          const force = Math.sqrt(acc.x**2 + acc.y**2 + acc.z**2);

          if (force > 12 && !this.isThrottled && !this.isFinished) {
            this.stepsDone++;
            this.isThrottled = true;

            setTimeout(() => { this.isThrottled = false; }, 400);

            if (this.stepsDone >= this.stepsTarget) {
              this.triggerSuccess();
              this.taskStatusText = "Aufgabe erledigt";
            }
            this.cdr.detectChanges();
          }
        });
      });
    } catch (e) {
      console.error('Motion API nicht verfügbar oder Berechtigung fehlt', e);
    }
  }

  async triggerSuccess() {
    this.isFinished = true;
    await Haptics.notification({ type: 'success' as any });
    this.cdr.detectChanges();
  }

  stopMotionTracking() {
    if (this.accelListener) {
      this.accelListener.remove();
    }
  }
}
