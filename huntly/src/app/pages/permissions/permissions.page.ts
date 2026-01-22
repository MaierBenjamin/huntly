import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  cameraOutline, locationOutline,
  checkmarkCircle, alertCircle
} from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PermissionsPage implements OnInit {
  hasCameraPerm = false;
  hasLocationPerm = false;

  constructor(private router: Router) {
    addIcons({ cameraOutline, locationOutline, checkmarkCircle, alertCircle });
  }

  async ngOnInit() {
    await this.checkCurrentStatus();
  }

  async checkCurrentStatus() {
    const geoStatus = await Geolocation.checkPermissions();
    this.hasLocationPerm = geoStatus.location === 'granted';

    const camStatus = await Camera.checkPermissions();
    this.hasCameraPerm = camStatus.camera === 'granted';
  }

  async requestPermissions() {
    try {

      if (!this.hasLocationPerm) {
        const locStatus = await Geolocation.requestPermissions();
        this.hasLocationPerm = locStatus.location === 'granted';
      }


      if (!this.hasCameraPerm) {
        const camStatus = await Camera.requestPermissions();
        this.hasCameraPerm = camStatus.camera === 'granted';
      }
    } catch (error) {
      console.error('Fehler beim Anfordern der Rechte:', error);
    }
  }

  bypass() {
    this.hasCameraPerm = true;
    this.hasLocationPerm = true;
  }

  startGame() {
    if (this.hasCameraPerm && this.hasLocationPerm) {
      this.router.navigate(['/task-gps']);
    }
  }
}
