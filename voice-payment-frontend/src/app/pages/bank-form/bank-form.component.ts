import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BankAccountService } from '../../services/bank-account.service';

@Component({
  selector: 'app-bank-form',
  templateUrl: './bank-form.component.html',
  styleUrls: ['./bank-form.component.css']
})
export class BankFormComponent {

  form: FormGroup;
  userId: number;

  constructor(
    private fb: FormBuilder,
    private bank: BankAccountService,
    public dialogRef: MatDialogRef<BankFormComponent>,

    // ✅ RECEIVE DATA SAFELY
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userId = data.userId;   // ✅ NOW AVAILABLE

    this.form = this.fb.group({
      name: ['', Validators.required],
      accountId: ['', Validators.required],
      branchName: ['', Validators.required],
      ifscCode: ['', Validators.required]
    });
  }

  submit() {
    if (this.form.invalid) return;

    this.bank.addAccount(this.userId, this.form.value).subscribe({
      next: () => {
        alert('Bank account added successfully');
        this.dialogRef.close(true);
      },
      error: () => alert('Failed to add bank account')
    });
  }

  close() {
    this.dialogRef.close();
  }
}
