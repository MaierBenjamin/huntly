import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-gps',
  templateUrl: './task-gps.page.html',
  styleUrls: ['./task-gps.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TaskGpsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
