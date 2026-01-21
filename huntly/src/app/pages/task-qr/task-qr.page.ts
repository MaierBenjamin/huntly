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
  scanned: boolean = false;

  constructor(private router: Router) {}


  startScan() {
    console.log('Kamera wird geöffnet...');

    setTimeout(() => {
      this.scanned = true;
    }, 1000);
  }

  onFinish() {
    if (this.scanned) {
      this.router.navigate(['/task-sensor']);
    } else {
      alert('Bitte scanne erst den QR-Code!');
    }
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
