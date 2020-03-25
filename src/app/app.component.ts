import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaesarCipherFormComponent } from './caesar-cipher-form/caesar-cipher-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CryptoApp';

  inputText: string;
  shift: number;
  file: File;
  cipherText: string;
  executionTime: number;
  form: FormGroup;

  get text() {
    return this.form.get('text');
  }

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.form = new FormGroup({
      text: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CaesarCipherFormComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.shift = result;
    });
  }

  submitInput() {
    this.inputText = (document.getElementById('text') as HTMLInputElement).value;
  }

  openInput() {
    document.getElementById('fileInput').click();
  }

  clearText() {
    this.cipherText = '';
    this.inputText = '';
    this.shift = null;
  }

  displayCipherText(event) {
    this.cipherText = event.text;
    this.executionTime = event.time;
  }

  fileChange(files: FileList) {
    const file = files.item(0);
    const fileReader: FileReader = new FileReader();

    fileReader.onloadend = function(x) {
      this.inputText = fileReader.result;
    }.bind(this);

    if (file) {
      fileReader.readAsText(file);
      this.form.reset();
    }
  }
}
