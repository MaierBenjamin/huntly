import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { trophyOutline, timeOutline, refreshOutline } from 'ionicons/icons'; // Fix: refreshOutline statt reOutline

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.page.html',
  styleUrls: ['./taskboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class TaskboardPage implements OnInit {

  constructor(
    public gameService: GameService,
    private router: Router
  ) {
    addIcons({ trophyOutline, timeOutline, refreshOutline });
  }

  ngOnInit() {
    this.gameService.stopGameTimer();

    this.gameService.saveCurrentGame();
  }

  getRank(): string {
    const s = this.gameService.schnitzelCount;
    const k = this.gameService.kartoffelCount;

    if (s > k && k === 0) return 'Schnitzel-Gott! 👑';
    if (s > k) return 'Schnitzel-König 🥩';
    if (k > s) return 'Kartoffel-Bauer 🥔';
    return 'Gutes Mittelfeld! 🙂';
  }

  restartGame() {
    this.gameService.resetGame();
    this.router.navigate(['/home']);
  }

  async sendToLeaderboard() {
  const url = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc9v68rbCckYwcIekRLOaVZ0Qdm3eeh1xCEkgpn3d7pParfLQ/formResponse';
  
  const body = new URLSearchParams({
    'entry.1860183935': this.gameService.playerName,
    'entry.564282981': this.gameService.schnitzelCount.toString(),
    'entry.1079317865': this.gameService.kartoffelCount.toString(),
    'entry.985590604': this.gameService.getFormattedTime()
  });

  try {
    const response = await fetch(url, {
      method: 'POST',
      mode: 'no-cors', 
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body.toString()
    });
    
    console.log('Anfrage gesendet!');
    this.router.navigate(['/leaderboard']);
  } catch (error) {
    console.error('Fehler:', error);
  }
}
}
