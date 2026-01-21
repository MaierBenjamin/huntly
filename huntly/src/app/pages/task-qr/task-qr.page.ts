import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { TaskLayoutComponent } from '../../components/task-layout/task-layout.component';
import { Router } from '@angular/router';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-task-qr',
  templateUrl: './task-qr.page.html',
  styleUrls: ['./task-qr.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, TaskLayoutComponent]
})
export class TaskQrPage {
  scanned: boolean = false;
  scanResult: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  async pickImageAndScan() {
    try {
      this.errorMessage = '';

      const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
        formats: [BarcodeFormat.QrCode]
      } as any);

      if (barcodes && barcodes.length > 0) {
        const value = barcodes[0].displayValue;


        if (value === 'Huntly ist cool!') {
          this.scanResult = value;
          this.scanned = true;
          await this.triggerSuccessHaptic();
        } else {
          this.errorMessage = 'Falscher Code! Such weiter.';
          this.scanned = false;
        }
      } else {
        this.errorMessage = 'Kein QR-Code auf dem Bild erkannt.';
      }
    } catch (e) {
      console.warn('Scan/Bildwahl abgebrochen');
      this.errorMessage = 'Bildwahl abgebrochen.';
    }
  }
  async triggerSuccessHaptic() {

    await Haptics.notification({
      type: 'success' as any
    });
  }

  onFinish() {
    if (this.scanned) {
      this.router.navigate(['/task-sensor']);
    }
  }

  onSkip() {
    this.router.navigate(['/task-sensor']);
  }

  onCancel() {
    this.router.navigate(['/home']);
  }
}
