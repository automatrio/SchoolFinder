import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationNotFoundDialogComponent } from 'src/app/common/location-not-found-dialog/location-not-found-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  dialogRef: MatDialogRef<LocationNotFoundDialogComponent>;

  constructor(private dialog: MatDialog) {

  }

  public openDialog(message: string, isError: boolean = false): void {
    this.dialogRef = this.dialog.open(LocationNotFoundDialogComponent, {
      width: '300px',
      height: '250px',
      data: {
        message: message,
        isError: isError
      },
    });
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
