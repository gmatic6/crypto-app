import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as forge from 'node-forge';
import * as converter from 'hex2dec';

@Component({
  selector: 'app-aes-encryption',
  templateUrl: './aes-encryption.component.html',
  styleUrls: ['./aes-encryption.component.css']
})
export class AesEncryptionComponent implements OnInit {

  private _inputText: string;
  @Input()
  set inputText(newText: string) {
    this._inputText = newText;
    if (newText && this._keyLength) {
      this.handleInput();
    }
  }
  get inputText() {
    return this._inputText;
  }

  private _keyLength: number;
  @Input()
  set keyLength(newKeyLength: number) {
    this._keyLength = newKeyLength;
    if (newKeyLength && this._inputText) {
      this.handleInput();
    }
  }
  get keyLength() {
    return this._keyLength;
  }

  @Output() cipherResult = new EventEmitter(true);

  constructor() { }

  ngOnInit(): void {
  }

  private handleInput(): void {
    const result = this.AES(this.inputText, this.keyLength);
    this.cipherResult.emit(result);
  }

  AES(inputText: string, keyLength: number) {
    const key = forge.random.getBytesSync(keyLength);
    const iv = forge.random.getBytesSync(keyLength);

    const cipher = forge.cipher.createCipher('AES-CBC', key);
    const startFrom = new Date().getTime();
    cipher.start({iv});
    cipher.update(forge.util.createBuffer(inputText));
    cipher.finish();
    const encrypted = cipher.output;

    return {text: encrypted.toHex(), time: new Date().getTime() - startFrom};

  }

  stringToDec(inputText: string) {
    const upperText = inputText.toLocaleUpperCase('en-US');
    let result = '';
    for (let i = 0; i < upperText.length; i++) {
      result += upperText.charCodeAt(i).toString(16);
    }
    return converter.hexToDec(result);
  }
}
