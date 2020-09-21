import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CaesarCipherFormComponent } from './caesar-cipher-form/caesar-cipher-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RsaEncryptionFormComponent } from './rsa-encryption-form/rsa-encryption-form.component';
import { ZigZagFormComponent } from './zig-zag-form/zig-zag-form.component';
import { EnigmaFormComponent } from './enigma-form/enigma-form.component';
import { AesEncryptionFormComponent } from './aes-encryption-form/aes-encryption-form.component';

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
  variant: any;
  rows: number;
  rotors: object;
  keyLength: number;

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
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.shift = result;
    });
  }

  openRSADialog(): void {
    const dialogRef = this.dialog.open(RsaEncryptionFormComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.variant = result;
    });
  }

  openZigZagDialog(): void {
    const dialogRef = this.dialog.open(ZigZagFormComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rows = result;
    });
  }

  openEnigmaDialog(): void {
    const dialogRef = this.dialog.open(EnigmaFormComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rotors = result.configuration;
      console.log(this.rotors);
    });
  }

  openAESDialog(): void {
    const dialogRef = this.dialog.open(AesEncryptionFormComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      this.keyLength = result;
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
    this.variant = null;
    this.rows = null;
    this.shift = null;
    this.rotors = null;
    this.keyLength = null;
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
