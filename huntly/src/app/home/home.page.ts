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

  restartGame() {
    this.gameService.resetGame();
    this.router.navigate(['/home']);
  }

  startHunt() {
    this.gameService.resetGame();
    this.gameService.startGameTimer();
    this.router.navigate(['/permissions']);
  }

  onCancel() {
    this.gameService.resetGame();
    this.router.navigate(['/home']);
  }


  openHistory() { this.router.navigate(['/history']); }
  openLeaderboard() { this.router.navigate(['/leaderboard']); }
}
