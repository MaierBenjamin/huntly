import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { GameService } from '../services/game.service'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {
  constructor(
    public gameService: GameService,
    private router: Router
  ) {}

  startHunt() {
    if (this.gameService.playerName) {
      this.router.navigate(['/permissions']);
    }
  }

  openHistory() { console.log('Verlauf'); }
  openLeaderboard() { console.log('Rangliste'); }
}
