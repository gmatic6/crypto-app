import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-caesar-cipher',
  templateUrl: './caesar-cipher.component.html',
  styleUrls: ['./caesar-cipher.component.css']
})
export class CaesarCipherComponent implements OnInit {

  private _shift: number;
  @Input()
  set shift(newShift: number) {
    this._shift = +newShift;
    if (newShift && this.inputText) {
      this.handleInput();
    }
  }
  get shift() {
    return this._shift;
  }

  private _inputText: string;
  @Input()
  set inputText(newText: string) {
    this._inputText = newText;
    if (newText && this.shift) {
      this.handleInput();
    }
  }
  get inputText() {
    return this._inputText;
  }

  @Output() cipherResult = new EventEmitter(true);

  constructor() { }

  ngOnInit(): void {
  }

  private handleInput(): void {
    const result = this.caesarCipher(this.inputText, this.shift);
    this.cipherResult.emit(result);
  }

  private caesarCipher(inputText: string, shift: number) {
    const asciiCode: number[] = [];
    const upperText = inputText.toLocaleUpperCase('en-US');
    let cipherText = '';
    const startFrom = new Date().getTime();

    for (let i = 0; i < upperText.length; i++) {

      if (upperText.charCodeAt(i) !== 32) {
        asciiCode[i] = upperText.charCodeAt(i) + shift;
      } else {
        asciiCode[i] = upperText.charCodeAt(i);
      }

      if (asciiCode[i] > 90) {
        asciiCode[i] -= 26;
      } else if (asciiCode[i] < 65 && asciiCode[i] !== 32) {
        asciiCode[i] += 26;
      }
      cipherText = cipherText.concat(String.fromCharCode(asciiCode[i]));
    }

    return {text: cipherText, time: new Date().getTime() - startFrom};
  }
}
