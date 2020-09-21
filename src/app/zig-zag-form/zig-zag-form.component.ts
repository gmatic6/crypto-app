import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-zig-zag-form',
  templateUrl: './zig-zag-form.component.html',
  styleUrls: ['./zig-zag-form.component.css']
})
export class ZigZagFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppComponent>
  ) { }

  get rows() {
    return this.form.get('rows');
  }

  getErrorMessage() {
    if (this.rows.hasError('required')) {
      return 'You must enter a value';
    }

    return this.rows.hasError('min') ? 'Number of rows must be greater than zero' : '';
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      rows: new FormControl(1, [Validators.required, Validators.min(1)])
    });
  }

  onSubmit(form) {
    this.dialogRef.close(`${form.value.rows}`);
  }

}
