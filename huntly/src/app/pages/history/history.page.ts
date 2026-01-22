import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { GameService, GameResult } from '../../services/game.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline, trophyOutline, timeOutline, hourglassOutline } from 'ionicons/icons';

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
    private navCtrl: NavController
  ) {
    addIcons({ arrowBackOutline, trophyOutline, timeOutline, hourglassOutline });
  }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.history = this.gameService.getHistory();
  }

  goBack() {
    this.navCtrl.back();
  }

  clearAll() {
    if (confirm('Möchtest du wirklich alle Einträge löschen?')) {
      this.gameService.clearHistory();
      this.loadHistory();
    }
  }
}
