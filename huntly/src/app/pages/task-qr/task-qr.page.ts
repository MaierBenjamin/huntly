import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-qr',
  templateUrl: './task-qr.page.html',
  styleUrls: ['./task-qr.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TaskLayoutComponent]
})
export class TaskQrPage {
  isScanning: boolean = false;
  scanResult: string | null = null;

  constructor(private router: Router) {}

  async startScan() {
    this.isScanning = true;
    console.log('Scanner gestartet...');
  }

  completeTask() {
    this.router.navigate(['/task-sensor']);
  }
}
