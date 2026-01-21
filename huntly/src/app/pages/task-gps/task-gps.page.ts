import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-gps',
  templateUrl: './task-gps.page.html',
  styleUrls: ['./task-gps.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TaskLayoutComponent]
})
export class TaskGpsPage implements OnInit {
  distance: number = 10;

  constructor(private router: Router) {}

  ngOnInit() {

    const interval = setInterval(() => {
      if (this.distance > 0) {
        this.distance -= 2;
      } else {
        clearInterval(interval);
      }
    }, 2000);
  }

  completeTask() {
    console.log('Task manuell als erledigt markiert');
    this.router.navigate(['/task-qr']);
  }

  nextTask() {
    console.log('Task übersprungen');
    this.router.navigate(['/task-qr']);
  }

  abortGame() {
    console.log('Spiel abgebrochen');
    this.router.navigate(['/home']);
  }
}
