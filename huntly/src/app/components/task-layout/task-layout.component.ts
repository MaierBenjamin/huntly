import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task-layout',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.scss']
})
export class TaskLayoutComponent implements OnInit, OnDestroy {
  @Input() taskTitle: string = '';
  @Input() taskTimer!: string;

  @Input() isFinished: boolean = false;

  @Output() finish = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  currentTime: string = '';
  private timerInterval: any;

  ngOnInit() {
    this.updateTime();

    this.timerInterval = setInterval(() => this.updateTime(), 30000);
  }

  ngOnDestroy() {
    if (this.timerInterval) clearInterval(this.timerInterval);
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}
