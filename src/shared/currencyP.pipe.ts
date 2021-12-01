import { Pipe } from '@angular/core';

@Pipe({
    name: 'numberCurrencyFormat'
})
export class CurrencyP {

    constructor() {

    }

    transform(value: number): string {
        let ch = String(value).split('.');
        let l = ch[1]?.length;
        while (l < 3) {
            ch[1] += '0';
            l++;
        }

        return ch[0] + ',' + ch[1];
    }
}
