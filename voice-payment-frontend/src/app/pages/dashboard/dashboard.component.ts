import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../services/payment.service';
import { SpeechService } from '../../services/speech.service';
import { BankAccountService } from '../../services/bank-account.service';
import { MatDialog } from '@angular/material/dialog';
import { BankFormComponent } from '../bank-form/bank-form.component';
import { BalanceDialogComponent } from '../balance-dialog/balance-dialog.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: any;
  transactions: any[] = [];
  bankAccounts: any[] = [];
  displayedColumns = ['date', 'person', 'amount'];

  constructor(
    private payment: PaymentService,
    private speech: SpeechService,
    private bank: BankAccountService,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const storedUser = localStorage.getItem('user');
    this.user = storedUser ? JSON.parse(storedUser) : null;
  }

  ngOnInit() {
    if (!this.user) {
      this.router.navigate(['/login']);
      return;
    }
    this.loadTransactions();
    this.loadBankAccounts();
  }

  loadTransactions() {
    this.payment.getTransactions(this.user.id).subscribe({
      next: data => this.transactions = data
    });
  }

  loadBankAccounts() {
    this.bank.getAccounts(this.user.id).subscribe({
      next: data => this.bankAccounts = data
    });
  }

  addBankAccount() {
    this.dialog.open(BankFormComponent, {
      data: { userId: this.user.id }
    }).afterClosed().subscribe(result => {
      if (result) this.loadBankAccounts();
    });
  }

  async makePayment() {
  if (this.bankAccounts.length === 0) {
    this.snackBar.open('Please add a bank account first', 'OK', { duration: 4000 });
    return;
  }

  // Step 1: Get payment details
  alert('Please say payment details like: pay 100 to Deepika');
  let speechText: string;
  try {
    speechText = await this.speech.listen();
  } catch (e) {
    this.snackBar.open('Speech recognition failed', 'OK', { duration: 4000 });
    return;
  }

  const amountMatch = speechText.match(/\d+/);
  const amount = amountMatch ? Number(amountMatch[0]) : null;
  const personPart = speechText.split(/to|for/i);
  const person = personPart.length > 1 ? personPart[1].trim().split(/please|rupees|rs/i)[0]?.trim() : null;

  if (!amount || !person) {
    this.snackBar.open('Could not understand payment. Try: "pay 500 to Ramesh"', 'OK', { duration: 5000 });
    return;
  }

  // Step 2: Ask for password confirmation
  alert('Please say your password to confirm the payment of ₹' + amount + ' to ' + person);
  let passwordText: string;
  try {
    passwordText = await this.speech.listen();
  } catch (e) {
    this.snackBar.open('Password input failed', 'OK', { duration: 4000 });
    return;
  }

  if (!passwordText.trim()) {
    this.snackBar.open('No password spoken. Payment cancelled.', 'OK', { duration: 4000 });
    return;
  }

  // Send payment request with password
  this.payment.makePayment(this.user.id, person, amount, passwordText).subscribe({
    next: (tx: any) => {
      this.transactions = [tx, ...this.transactions];
      this.user.balance -= amount;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.snackBar.open(`Payment of ₹${amount} to ${person} successful!`, 'OK', { duration: 5000 });
    },
    error: (err) => {
      const errorMessage = err.error?.error || err.message || 'Payment failed';

      // Special handling for wrong password
      if (errorMessage.includes('Incorrect password') || errorMessage.includes('password')) {
    alert('Password is wrong. Payment failed.');
  } else {
    alert(errorMessage);
  }
    }
  });
}

  // In showBalance()
showBalance() {
  const dialogRef = this.dialog.open(BalanceDialogComponent, {
    width: '420px',
    data: { 
      balance: this.user.balance, 
      userId: this.user.id 
    }
  });

  dialogRef.afterClosed().subscribe(updatedBalance => {
    if (updatedBalance !== undefined) {
      this.user.balance = updatedBalance;
      localStorage.setItem('user', JSON.stringify(this.user));
      this.snackBar.open('Balance updated', 'OK', { duration: 3000 });
    }
  });
}

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}