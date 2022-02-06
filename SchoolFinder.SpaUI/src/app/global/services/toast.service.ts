import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationNotFoundDialogComponent } from 'src/app/common/dialogs/location-not-found-dialog.component';
import { WelcomeDialogComponent } from 'src/app/common/dialogs/welcome-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  errorDialogRef: MatDialogRef<LocationNotFoundDialogComponent>;
  welcomeDialogRef: MatDialogRef<WelcomeDialogComponent>;

  constructor(private dialog: MatDialog) {

  }

  public openErrorDialog(message: string, isError: boolean = false): void {
    this.errorDialogRef = this.dialog.open(LocationNotFoundDialogComponent, {
      width: '300px',
      height: '250px',
      data: {
        message: message,
        isError: isError
      },
    });
  }

  public openWelcomeDialog(): void {
    this.welcomeDialogRef = this.dialog.open(WelcomeDialogComponent, {
      width: '300px',
      height: '300px',
    });
  }

  public closeDialog() {
    this.errorDialogRef.close();
  }
}
