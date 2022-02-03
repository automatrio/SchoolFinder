import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../interfaces/dialog-data';

@Component({
  selector: 'app-location-not-found-dialog',
  template: `
    <div class="location-not-found__container">
      <h4 class="location-not-found__header">
        <b>Não conseguimos encontrar este endereço!</b>
      </h4>
      <p class="location-not-found__text">
        {{
          data.isError
          ? data.message
          : "Quer uma sugestão? Tente adicionar mais informações, como o CEP ou o bairro!"
        }}
      </p>
      <button mat-raised-button color="warn" (click)="dismiss()">Ok, entendi!</button>
    </div>
  `,
  styles: [`
    .location-not-found__container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 40px;
      height: 100%;

      .location-not-found__header {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
        font-size: 20px;
      }
      .location-not-found__text {
        grid-column: 1 / 3;
        grid-row: 2 / 3;
        font-size: 16px;
      }
      button {
        grid-column: 2 / 3;
        grid-row: 3 / 4;
        align-self: end;
      }
    }
  `]
})
export class LocationNotFoundDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<LocationNotFoundDialogComponent>) {}

  dismiss(): void {
    this.dialogRef.close();
  }
}
