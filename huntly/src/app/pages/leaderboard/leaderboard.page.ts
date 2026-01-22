import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.page.html',
  styleUrls: ['./leaderboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class LeaderboardPage implements OnInit {
  globalScores: any[] = [];
  isLoading = true;

  constructor(
    private gameService: GameService,
    private navCtrl: NavController
  ) {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.isLoading = true;
    try {
      const scores = await this.gameService.getOnlineLeaderboard();

      this.globalScores = scores.sort((a, b) => {
        if (b.schnitzel !== a.schnitzel) {
          return b.schnitzel - a.schnitzel;
        }
        return a.duration.localeCompare(b.duration);
      });
    } catch (error) {
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  goBack() {
    this.navCtrl.back();
  }
}
