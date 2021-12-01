import { Pipe } from '@angular/core';

@Pipe({
    name: 'customCurrencyFormat'
})
export class Currency {

    constructor() {

    }

    transform(value: number,
        currencySign: string = '',
        decimalLength: number = 3,
        chunkDelimiter: string = ' ',
        decimalDelimiter: string = ',',
        chunkLength: number = 3): string {

        if (!value) {
            return '0'
        }


        value /= 1000
        const result = '\\d(?=(\\d{' + chunkLength + '})+' + (decimalLength > 0 ? '\\D' : '$') + ')';
        const num = value.toFixed(Math.max(0, ~~decimalLength));

        return (decimalDelimiter ? num.replace('.', decimalDelimiter) : num).replace(new RegExp(result, 'g'), '$&' + chunkDelimiter) + currencySign;
    }
}
