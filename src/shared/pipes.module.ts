import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Currency } from './currency.pipe';



@NgModule({
    imports: [CommonModule],
    declarations: [

        Currency
    ],
    exports: [

        Currency
    ],
})
export class PipesModule { }
