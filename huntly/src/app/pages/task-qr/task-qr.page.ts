import { Component } from '@angular/core';
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
export class TaskQrPage {
  scanned: boolean = false;
  scanResult: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

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

  onFinish() { this.router.navigate(['/task-sensor']); }
  onSkip() { this.onFinish(); }
  onCancel() { this.router.navigate(['/home']); }
}
