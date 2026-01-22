import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { trophyOutline, timeOutline, refreshOutline } from 'ionicons/icons';

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
  }

  restartGame() {
    this.gameService.resetGame();
    this.router.navigate(['/home']);
  }
}
