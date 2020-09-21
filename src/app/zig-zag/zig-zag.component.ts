import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-zig-zag',
  templateUrl: './zig-zag.component.html',
  styleUrls: ['./zig-zag.component.css']
})
export class ZigZagComponent implements OnInit {

  private _rows: number;
  @Input()
  set rows(newRows: number) {
    this._rows = +newRows;
    if (newRows && this.inputText) {
      this.handleInput();
    }
  }
  get rows() {
    return this._rows;
  }

  private _inputText: string;
  @Input()
  set inputText(newText: string) {
    this._inputText = newText;
    if (newText && this.rows) {
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
    const result = this.zigzagCipher(this.inputText, this.rows);
    this.cipherResult.emit(result);
  }

  private zigzagCipher(inputText: string, rows: number) {
    const text = inputText.toLocaleUpperCase('en-US').split('').filter(e => e !== ' ');
    let cipherText = '';
    const startFrom = new Date().getTime();

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < text.length; j += rows) {
        if (text[j + i]) {
          cipherText = cipherText.concat(text[j + i]);
        }
      }
    }

    return {text: cipherText, time: new Date().getTime() - startFrom};
  }
}
