import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Motion } from '@capacitor/motion';
import { Haptics } from '@capacitor/haptics';
import { Router } from '@angular/router';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';

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
  
  remainingTime: number = 30; 
  localTimer: string = '00:30';
  timerInterval: any;
  penaltyCount: number = 0;

  taskStatusText = "Löse die Aufgabe";


  private accelListener: any;
  private isThrottled: boolean = false;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    public router: Router
  ) {}

  async ngOnInit() {
    this.startTimer();
    this.startMotionTracking();
  }

  ngOnDestroy() {
    this.stopTimer();
    this.stopMotionTracking();
  }


  completeTask() {
    if (this.isFinished) {
      this.stopMotionTracking();
      this.router.navigate(['/task-qr']);
    } else {
      console.log('Aufgabe noch nicht erfüllt!');
    }
  }

  nextTask() {

    this.stopMotionTracking();
    this.router.navigate(['/task-qr']);
  }

  abortGame() {
    this.stopMotionTracking();
    this.router.navigate(['/home']);
  }


  startTimer() {
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
  }

  formatTime() {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    this.localTimer = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  stopTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }


  async startMotionTracking() {
    try {
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
    this.stopTimer();
    await Haptics.notification({ type: 'success' as any });
    this.cdr.detectChanges();
  }

  stopMotionTracking() {
    if (this.accelListener) {
      this.accelListener.remove();
    }
  }
}
