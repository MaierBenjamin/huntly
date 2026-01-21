import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonText
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, locationOutline, checkmarkCircleOutline, alertCircleOutline } from 'ionicons/icons';
import { Geolocation } from '@capacitor/geolocation';
import { Camera } from '@capacitor/camera';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.page.html',
  styleUrls: ['./permissions.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
    IonList, IonItem, IonLabel, IonIcon, IonText,
    CommonModule, FormsModule
  ]
})
export class PermissionsPage implements OnInit {
  hasCameraPerm = false;
  hasLocationPerm = false;

  constructor(
    private router: Router,
    public gameService: GameService
  ) {

    addIcons({ cameraOutline, locationOutline, checkmarkCircleOutline, alertCircleOutline });
  }

  ngOnInit() {}

  async requestPermissions() {
    try {
      const locStatus = await Geolocation.requestPermissions();
      this.hasLocationPerm = locStatus.location === 'granted';

      const camStatus = await Camera.requestPermissions();
      this.hasCameraPerm = camStatus.camera === 'granted';

    } catch (error) {
      console.error('Berechtigungen nicht erhatlen', error);
    }
  }

  startGame() {
    if (this.hasCameraPerm && this.hasLocationPerm) {
      this.router.navigate(['/task']);
    }
  }
}
