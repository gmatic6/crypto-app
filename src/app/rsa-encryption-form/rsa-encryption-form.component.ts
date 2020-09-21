import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-rsa-encryption-form',
  templateUrl: './rsa-encryption-form.component.html',
  styleUrls: ['./rsa-encryption-form.component.css']
})
export class RsaEncryptionFormComponent implements OnInit {

  form: FormGroup;
  strength: string;

  constructor(public dialogRef: MatDialogRef<AppComponent>) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.dialogRef.close(`${this.strength}`);
  }

}
