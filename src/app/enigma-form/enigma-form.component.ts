import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-enigma-form',
  templateUrl: './enigma-form.component.html',
  styleUrls: ['./enigma-form.component.css']
})
export class EnigmaFormComponent implements OnInit {

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AppComponent>
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      rotor1: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(26)]),
      rotor2: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(26)]),
      rotor3: new FormControl(1, [Validators.required, Validators.min(1), Validators.max(26)])
    });
  }

  onSubmit(form) {
    this.dialogRef.close({configuration: form.value});
  }

}
