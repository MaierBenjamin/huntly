import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GameService, GameResult } from '../../services/game.service';
import { addIcons } from 'ionicons';
import { trashOutline, arrowBackOutline, trophyOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class HistoryPage implements OnInit {
  history: GameResult[] = [];

  constructor(
    private gameService: GameService,
    private router: Router
  ) {
    addIcons({ trashOutline, arrowBackOutline, trophyOutline });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.history = this.gameService.getHistory();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  clearAll() {
    if (confirm('Möchtest du wirklich alle Einträge löschen?')) {
      this.gameService.clearHistory();
      this.loadHistory();
    }
  }
}
