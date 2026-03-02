import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-balance-dialog',
  templateUrl: './balance-dialog.component.html',
  styleUrls: ['./balance-dialog.component.css']
})
export class BalanceDialogComponent {

  currentBalance: number;

  constructor(
    public dialogRef: MatDialogRef<BalanceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { balance: number, userId: number },
    private paymentService: PaymentService,
    private snackBar: MatSnackBar
  ) {
    this.currentBalance = data.balance;
  }

  addMoney() {
    const amountToAdd = 500;
    this.paymentService.addMoney(this.data.userId, amountToAdd).subscribe({
      next: (response: any) => {
        this.currentBalance = response.newBalance;
        this.snackBar.open(`₹${amountToAdd} added successfully!`, 'OK', { duration: 4000 });
      },
      error: () => {
        this.snackBar.open('Failed to add money', 'OK', { duration: 4000, panelClass: ['error-snackbar'] });
      }
    });
  }

  close() {
    this.dialogRef.close(this.currentBalance); // optional: return updated balance to parent
  }
}