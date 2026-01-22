import { Component, OnInit, OnDestroy, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { Haptics } from '@capacitor/haptics';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-task-qr',
  templateUrl: './task-qr.page.html',
  styleUrls: ['./task-qr.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TaskLayoutComponent]
})
export class TaskQrPage implements OnInit, OnDestroy {

  scanned = false;
  scanResult = '';
  errorMessage = '';

  remainingTime = 120;
  localTimer = '02:00';
  timerInterval: any;
  penaltyCount = 0;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit() {
    this.formatTime();
    this.startTimer();
  }

  ngOnDestroy() {
    this.stopTimer();
  }

  startTimer() {
    this.ngZone.run(() => {
      this.timerInterval = setInterval(() => {
        if (this.remainingTime > 0) {
          this.remainingTime--;
          this.formatTime();
        } else {
          this.penaltyCount++;
          console.log('⏱️ Zeit abgelaufen! Penalty:', this.penaltyCount);
          this.stopTimer();
        }
        this.cdr.detectChanges();
      }, 1000);
    });
  }

  formatTime() {
    const min = Math.floor(this.remainingTime / 60);
    const sec = this.remainingTime % 60;
    this.localTimer = `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
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
            this.stopTimer(); 
            await this.triggerSuccessHaptic();
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


  onFinish() { this.router.navigate(['/task-wifi']); }
  onSkip() { this.router.navigate(['/task-wifi']); }
  onCancel() { this.router.navigate(['/home']); }
}
