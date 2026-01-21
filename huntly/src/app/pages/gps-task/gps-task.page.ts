import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-gps-task',
  templateUrl: './gps-task.page.html',
  styleUrls: ['./gps-task.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GpsTaskPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  distance: number = 0;
}
