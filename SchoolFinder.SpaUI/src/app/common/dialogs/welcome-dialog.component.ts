import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-welcome-dialog-dialog',
  template: `
    <div class="welcome-dialog__container">
      <h4 class="welcome-dialog__header">
        <b>Bem-vindo ao SchoolFinder!</b>
      </h4>
      <p class="welcome-dialog__text">
        Utilize esta aplicação para encontrar uma escola em Porto Alegre
        que seja próxima ao seu endereço. Você pode utilizar filtros
        para especificar sua busca, buscar por rotas favoráveis e 
        informar-se sobre meios de contato.
      </p>
      <button mat-raised-button color="warn" (click)="dismiss()">Ok, entendi!</button>
    </div>
  `,
  styles: [`
    .welcome-dialog__container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr 40px;
      height: 100%;

      .welcome-dialog__header {
        grid-column: 1 / 3;
        grid-row: 1 / 3;
        font-size: 20px;
      }
      .welcome-dialog__text {
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
export class WelcomeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<WelcomeDialogComponent>) {}

  dismiss(): void {
    this.dialogRef.close();
  }
}
