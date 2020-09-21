import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as bigInt from 'big-integer';
import * as converter from 'hex2dec';
import * as forge from 'node-forge';
import * as n2f from 'num2fraction';

@Component({
  selector: 'app-rsa-encryption',
  templateUrl: './rsa-encryption.component.html',
  styleUrls: ['./rsa-encryption.component.css']
})

export class RsaEncryptionComponent implements OnInit {

  private _inputText: string;
  @Input()
  set inputText(newText: string) {
    this._inputText = newText;
    if (newText && this._strength) {
      this.handleInput(this._strength);
    }
  }
  get inputText() {
    return this._inputText;
  }

  private _strength: string;
  @Input()
  set strength(newStrength: string) {
    this._strength = newStrength;
    if (newStrength && this._inputText) {
      this.handleInput(newStrength);
    }
  }
  get strength() {
    return this._strength;
  }

  @Output() cipherResult = new EventEmitter(true);

  constructor() { }

  ngOnInit(): void {
  }

  handleInput(strength: string) {
    if (strength === 'Weak') {
      this.weakRSA();
    } else  if (strength === 'Strong') {
      this.strongRSA();
    }
  }

  strongRSA() {

    const input = this.stringToDec(this.inputText);

    const rsa = forge.pki.rsa;
    const keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001});

    console.log(keypair);

    const startFrom = new Date().getTime();

    const ciphered = keypair.publicKey.encrypt(this.inputText);
    this.cipherResult.emit({text: ciphered.toString(), time: new Date().getTime() - startFrom});

    // const deciphered = keypair.privateKey.decrypt(ciphered);
  }

  weakRSA() {
    let result = '';
/*
    // generate p and q
    const p = this.generatePrime(1000, 2000);
    console.log('p =', p.toString(), '|', p.bitLength().toString(), 'bits');
    result = result.concat('p = ' + p.toString() + ' | ' + p.bitLength().toString(), ' bits <br>');

    let q;
    do {
      q = this.generatePrime(1000, 2000);
    } while (p.toString() === q.toString());
    console.log('q =', q.toString(), '|', q.bitLength().toString(), 'bits');
    result = result.concat('q = ' + q.toString() + ' | ' + q.bitLength().toString() + ' bits <br>');

    // find N and phi
    const N = p.multiply(q);
    console.log('N =', N.toString(), '|', N.bitLength().toString(), 'bits');
    result = result.concat('N = ' + N.toString() + ' | ' + N.bitLength().toString() + ' bits <br>');

    const phi = (p.minus(1)).multiply((q.minus(1)));
    console.log('ϕ =', phi.toString(), '|', phi.bitLength().toString(), 'bits');
    result = result.concat('ϕ = ' + phi.toString() + ' | ' + phi.bitLength().toString(), ' bits <br>');

    // generate e and calculate d
    let e;
    let d;
    do {
      do {
        e = bigInt.randBetween(1, phi.minus(1));
      } while (bigInt.gcd(e, phi).notEquals(1));
      d = this.euclid(phi, e);
    } while (Number(d) > Math.pow(Number(N), 0.25) / 3 || Number(d) === 1); // for Wiener's attack purposes
    console.log('e =', e.toString(), '|', e.bitLength().toString(), 'bits');
    console.log('d =', d.toString(), '|', d.bitLength().toString(), 'bits');

 */
    const p = bigInt(1607);
    console.log('p =', p.toString(), '|', p.bitLength().toString(), 'bits');
    const q = bigInt(1993);
    console.log('q =', q.toString(), '|', q.bitLength().toString(), 'bits');

    const N = p.multiply(q);
    console.log('N =', N.toString(), '|', N.bitLength().toString(), 'bits');
    result = result.concat('N = ' + N.toString() + ' | ' + N.bitLength().toString() + ' bits <br>');

    const phi = (p.minus(1)).multiply((q.minus(1)));
    console.log('ϕ =', phi.toString(), '|', phi.bitLength().toString(), 'bits');
    result = result.concat('ϕ = ' + phi.toString() + ' | ' + phi.bitLength().toString(), ' bits <br>');

    const e = bigInt(1279661);
    const d = bigInt(5);
    console.log('e =', e.toString(), '|', e.bitLength().toString(), 'bits');
    console.log('d =', d.toString(), '|', d.bitLength().toString(), 'bits');

    const input = bigInt(this.stringToDec(this.inputText));
    let startFrom = new Date().getTime();
    // check input size, if too big then divide it into pieces for encryption
    if (input.bitLength().greater(N.bitLength())) {
      const slicedInput = [];
      const inputArray = Array.from(input.toString());
      const chunkSize = Math.pow(2, N.bitLength().toJSNumber()).toString().length - 1;

      for (let i = 0, j = inputArray.length; i < j; i += chunkSize) {
        slicedInput.push(inputArray.slice(i, i + chunkSize).join(''));
      }
      console.log(slicedInput);
      let res = '';
      let ok = true;
      startFrom = new Date().getTime();
      for (const slice of slicedInput) {
        const cipher = bigInt(slice).modPow(bigInt(e.toString()), bigInt(N.toString()));
        let decipher = bigInt(cipher).modPow(bigInt(d.toString()), bigInt(N.toString())).toString();

        if (bigInt(slice).toString().length < chunkSize) {
          decipher = decipher.padStart(slice.length, '0');
        }

        if (decipher !== slice) {
          ok = false;
        }
        console.log(decipher === slice);

        res = res.concat(cipher.toString());
      }

      this.cipherResult.emit({text: res, time: new Date().getTime() - startFrom});

      // start attacking
      console.log('Rho Factorization:');
      this.rhoFactorization(N);

      console.log('Probability Factorization:');
      let success;
      do {
        success = this.probabilisticFactorization(N, e, d);
      }while (success !== 1);

      console.log('Wieners attack:');
      this.wienerAttack(N, e);
      return;
    }
    // if input is not too big, encrypt normally
    const cipher = input.modPow(bigInt(e.toString()), bigInt(N.toString()));
    const decipher = cipher.modPow(bigInt(d.toString()), bigInt(N.toString()));

    this.cipherResult.emit({text: cipher.toString(), time: new Date().getTime() - startFrom});

    console.log('ULAZ: ', input.toString(), ' | ', input.bitLength().toString(), 'bits');
    console.log('ŠIFRIRANO: ', cipher.toString());
    console.log('DEŠIFRIRANO: ', decipher.toString());
    console.log('RSA OK: ', decipher.toString() === input.toString());
    console.log('ORIGINALNI TEKST:', this.decToString(decipher));

    // start attacking
    console.log('Rho Factorization:');
    this.rhoFactorization(N);
    console.log('Probability Factorization:');
    let success;
    do {
      success = this.probabilisticFactorization(N, e, d);
    }while (success !== 1);
    console.log('Wieners attack:');
    this.wienerAttack(N, e);
  }

  stringToDec(inputText: string) {
    const upperText = inputText.toLocaleUpperCase('en-US');
    let result = '';
    for (let i = 0; i < upperText.length; i++) {
      result += upperText.charCodeAt(i).toString(16);
    }
    return converter.hexToDec(result);
  }

  decToString(number) {
    const hex = converter.decToHex(number.toString());
    let result = '';
    for (let i = 0; i < hex.length; i += 2) {
      result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return result.trim();
  }

  generatePrime(min: number, max: number) {
    let result;
    do {
      result = this.getRandomOddInt(min, max);
    } while (!this.isPrime(result));
    return bigInt(result);
  }

  getRandomOddInt(min: number, max: number) {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);

    const randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    const res = Math.floor(randomNumber * (max - min + 1)) + min;

    return res % 2 === 0 ? res + 1 : res;
  }

  isPrime(n: number): boolean {
    for (let i = 2; i < n; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

  euclid(phi, e) {
    let inv = bigInt(-1);
    let r1 = phi;
    let r2 = e;
    let t1 = bigInt.zero;
    let t2 = bigInt.one;

    while (r2 > 0) {
      // i pocinje od 1 tu
      const q = r1.divide(r2);
      const t = t1.minus(q.multiply(t2));
      const r = r1.minus(q.multiply(r2));

      if (r.isZero()) {
        inv = t2.lesser(0) ? t2.plus(phi) : t2;
      }

      // zamjene za iducu iteraciju
      r1 = r2;
      r2 = r;
      t1 = t2;
      t2 = t;
    }

    return inv.mod(phi);
  }

  rhoFactorization(N: bigInt.BigInteger) {
    let x = bigInt(2);
    let y = bigInt(2);
    let d = bigInt(1);

    while (d.equals(bigInt(1))) {
      x = x.modPow(2, N);
      y = y.modPow(2, N);
      y = y.modPow(2, N);
      d = bigInt.gcd(x.minus(y).abs(), N);
    }

    if (d.equals(N)) {
      console.log('failed factorization');
      return;
    } else {
      console.log('p =', d.toString());
      console.log('q =', N.divide(d).toString());
      return;
    }
  }

  probabilisticFactorization(N: bigInt.BigInteger, e: bigInt.BigInteger, d: bigInt.BigInteger) {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
      31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
      73, 79, 83, 89, 97, 101, 103, 107, 109, 113,
      127, 131, 137, 139, 149, 151, 157, 163, 167, 173,
      179, 181, 191, 193, 197, 199, 211, 223, 227, 229,
      233, 239, 241, 251, 257, 263, 269, 271, 277, 281];

    const k = e.times(d).minus(1);
    const g = bigInt(primes[Math.floor(Math.random() * Math.floor(primes.length))]);
    let t = k;

    while (true) {
      if (t.mod(2).equals(0)) {
        t = t.divide(2);
        const x = g.modPow(t, N);
        if (x.greater(1) && bigInt.gcd(x.minus(1), N).greater(1)) {
          console.log('p =', bigInt.gcd(x.minus(1), N).toString());
          console.log('q =', N.divide(bigInt.gcd(x.minus(1), N)).toString());
          return 1;
        } else {
          continue;
        }
      } else {
        console.log('Failed to factorize with g =', g.toString());
        return 0;
      }
    }
  }

  wienerAttack(N: bigInt.BigInteger, e: bigInt.BigInteger) {
    let a = Number(N);
    let b = Number(e);
    let cfValue = 0;
    const remainders = [];

    while (remainders.length < 15) {
      const c = Math.floor(b / a);
      const r = b - c * a;

      b = a;
      a = r;

      remainders.push(c);

      if (c !== 0) {
        for (let i = remainders.length - 1; i >= 0; i--) {
          if (remainders[i] !== 0) {
            cfValue = 1 / (remainders[i] + cfValue);
          }
        }
      }
      if (cfValue !== 0) {
        const d = bigInt(n2f(cfValue).split('/')[1]);
        if (bigInt(2).modPow(e, N).modPow(d, N).equals(bigInt(2))) {
          console.log('d =', d.toString());
          return;
        }
      }
      cfValue = 0;
    }
  }
}
