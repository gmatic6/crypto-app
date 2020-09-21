import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-enigma',
  templateUrl: './enigma.component.html',
  styleUrls: ['./enigma.component.css']
})
export class EnigmaComponent implements OnInit {

  private _config: object;
  @Input()
  set config(newConfig: object) {
    this._config = newConfig;
    if (newConfig && this.inputText) {
      this.handleInput();
    }
  }
  get config() {
    return this._config;
  }

  private _inputText: string;
  @Input()
  set inputText(newText: string) {
    this._inputText = newText;
    if (newText && this.config) {
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
    const result = this.enigmaCipher(this.inputText, this.config);
    this.cipherResult.emit(result);
  }

  private enigmaCipher(inputText: string, config: any) {

    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const rotor1 = 'EKMFLGDQVZNTOWYHXUSPAIBRCJ';
    const rotor2 = 'AJDKSIRUXBLHWTMCQGZNPYFVOE';
    const rotor3 = 'BDFHJLCPRTXVZNYEIWGAKMUSQO';
    const reflector = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';

    const text = inputText.toLocaleUpperCase('en-US').replace(/\s/g, '');
    let cipherText = '';
    const startFrom = new Date().getTime();

    for (const char of text) {
      let x = alphabet.indexOf(char);
      let y = alphabet[this.mod(alphabet.indexOf(rotor3[x]) + config.rotor3 - 1, 26)];

      x = alphabet.indexOf(y);
      y = alphabet[this.mod(alphabet.indexOf(rotor2[x]) + config.rotor2 - 1, 26)];

      x = alphabet.indexOf(y);
      y = alphabet[this.mod(alphabet.indexOf(rotor1[x]) + config.rotor1 - 1, 26)];

      x = alphabet.indexOf(y);
      y = reflector[x];

      x = rotor1.indexOf(alphabet[this.mod(alphabet.indexOf(y) - config.rotor1 + 1, 26)]);
      y = alphabet[this.mod(x, 26)];

      x = rotor2.indexOf(alphabet[this.mod(alphabet.indexOf(y) - config.rotor2 + 1, 26)]);
      y = alphabet[this.mod(x, 26)];

      x = rotor3.indexOf(alphabet[this.mod(alphabet.indexOf(y) - config.rotor3 + 1, 26)]);
      y = alphabet[this.mod(x, 26)];

      cipherText = cipherText.concat(y);

      config.rotor3++;
      if (config.rotor3 > 26) {
        config.rotor3 = 1;
        config.rotor2++;
      }
      if (config.rotor2 > 26) {
        config.rotor2 = 1;
        config.rotor1++;
      }
      if (config.rotor1 > 26) {
        config.rotor1 = 1;
      }
    }
    return {text: cipherText, time: new Date().getTime() - startFrom};
  }

  mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }
}
