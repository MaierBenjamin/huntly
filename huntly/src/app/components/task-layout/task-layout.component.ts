import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonFooter, IonButtons, IonButton, IonNote, IonBackButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-task-layout',
  templateUrl: './task-layout.component.html',
  styleUrls: ['./task-layout.component.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle,
    IonContent, IonFooter, IonButtons, IonButton, IonNote, IonBackButton
  ]
})
export class TaskLayoutComponent {
  @Input() taskNumber: string = '1/4'; // Beispiel: "1 von 4"
  @Input() taskTitle: string = 'Aufgabe';

  constructor() { }
}
