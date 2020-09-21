import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-aes-encryption-form',
  templateUrl: './aes-encryption-form.component.html',
  styleUrls: ['./aes-encryption-form.component.css']
})
export class AesEncryptionFormComponent implements OnInit {

  form: FormGroup;
  keyLength: number;

  constructor(public dialogRef: MatDialogRef<AppComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dialogRef.close(`${this.keyLength}`);
  }

}
