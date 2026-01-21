import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonLabel, IonInput, IonButton
} from '@ionic/angular/standalone';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonLabel, IonInput, IonButton,
    FormsModule
  ],
})
export class HomePage {
  constructor(public gameService: GameService, private router: Router) {}

  startHunt() {
    if (this.gameService.playerName.trim().length > 0) {
      this.router.navigate(['/permissions']);
    }
  }
}
