import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { Haptics } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-task-qr',
  templateUrl: './task-qr.page.html',
  styleUrls: ['./task-qr.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TaskLayoutComponent]
})
export class TaskQrPage implements OnInit {

  scanned = false;
  scanResult = '';
  errorMessage = '';

  taskStatusText = "Löse die Aufgabe";


  constructor(
    private router: Router,
    public gameService: GameService
  ) {}

  ngOnInit() {
  }

  async pickImageAndScan() {
    try {
      this.errorMessage = '';

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Prompt
      });

      if (image.path) {
        const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
          path: image.path,
          formats: [BarcodeFormat.QrCode]
        });

        if (barcodes && barcodes.length > 0) {
          const value = barcodes[0].displayValue;

          if (value === 'Huntly ist cool!') {
            this.scanResult = value;
            this.scanned = true;
            await this.triggerSuccessHaptic();
            this.taskStatusText = "Aufgabe erledigt"
          } else {
            this.errorMessage = 'Falscher Code! Such weiter.';
            await Haptics.vibrate();
          }
        } else {
          this.errorMessage = 'Kein QR-Code erkannt.';
        }
      }
    } catch (e: any) {
      console.error('QR-Fehler:', e);
      if (e.message !== 'User cancelled photos app') {
        this.errorMessage = 'Bild konnte nicht geladen werden.';
      }
    }
  }

  async triggerSuccessHaptic() {
    await Haptics.notification({ type: 'success' as any });
  }

  onFinish(isExpired: boolean) {
    this.gameService.addSchnitzel();

    if (isExpired) {
      this.gameService.addKartoffel();
    }

    this.router.navigate(['/task-wifi']);
  }

  onSkip() {
    this.gameService.addKartoffel();
    this.router.navigate(['/task-wifi']);
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
