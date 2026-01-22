import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-task-layout',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.scss']
})
export class TaskLayoutComponent implements OnInit, OnDestroy {
  @Input() taskTitle: string = '';
  @Input() isFinished: boolean = false;

  @Output() finish = new EventEmitter<boolean>();
  @Output() skip = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  taskSecondsLeft: number = 120;
  taskTimerDisplay: string = '02:00';
  isTimerExpired: boolean = false;

  private intervalId: any;

  constructor(public gameService: GameService) {}

  ngOnInit() {
    this.startTaskTimer();
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  startTaskTimer() {
    this.intervalId = setInterval(() => {
      if (this.taskSecondsLeft > 0) {
        this.taskSecondsLeft--;
        this.updateTimerDisplay();
      } else {
        this.isTimerExpired = true;
        this.taskTimerDisplay = '00:00';
        clearInterval(this.intervalId);
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const minutes = Math.floor(this.taskSecondsLeft / 60);
    const seconds = this.taskSecondsLeft % 60;
    this.taskTimerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  onFinishClick() {
    this.finish.emit(this.isTimerExpired);
  }
}
