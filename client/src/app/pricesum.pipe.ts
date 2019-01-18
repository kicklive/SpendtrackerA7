import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: 'itempricesum' })
export class ItemPriceSum implements PipeTransform {
    transform(value: any[]): number {
        debugger;
        let sum = 0;
        for (let i = 0; i < value.length; i++) {
            sum = sum + value[i].itemprice;
        }
        return sum;
    }
}
