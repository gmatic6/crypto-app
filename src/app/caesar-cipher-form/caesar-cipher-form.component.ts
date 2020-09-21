import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-caesar-cipher-form',
  templateUrl: './caesar-cipher-form.component.html',
  styleUrls: ['./caesar-cipher-form.component.css']
})
export class CaesarCipherFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AppComponent>
    ) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      shift: 0
    });
  }

  onSubmit(form) {
    this.dialogRef.close(`${form.value.shift}`);
  }
}
