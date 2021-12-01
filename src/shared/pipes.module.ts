import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Currency } from './currency.pipe';
import { CurrencyP } from './currencyP.pipe';



@NgModule({
    imports: [CommonModule],
    declarations: [

        Currency, CurrencyP
    ],
    exports: [

        Currency, CurrencyP
    ]
})
export class PipesModule { }
