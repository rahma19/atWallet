import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Currency } from './currency.pipe';
import { CurrencyP } from './currencyP.pipe';
import { NumberFormat } from './number.pipe';



@NgModule({
    imports: [CommonModule],
    declarations: [

        Currency, CurrencyP, NumberFormat
    ],
    exports: [

        Currency, CurrencyP, NumberFormat
    ]
})
export class PipesModule { }
