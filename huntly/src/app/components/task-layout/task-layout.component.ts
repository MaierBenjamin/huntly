import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-task-layout',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.scss']
})
export class TaskLayoutComponent {
  @Input() taskTitle: string = '';
  @Input() isFinished: boolean = false;

  @Output() finish = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  onFinish() { this.finish.emit(); }
  onSkip() { this.skip.emit(); }
  onCancel() { this.cancel.emit(); }
}
