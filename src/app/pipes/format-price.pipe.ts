import { Pipe, PipeTransform } from '@angular/core';
import { ProductModel } from '../models/product-model';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  transform(price?: number, product?: ProductModel): any {
    price = price ? price : 0;
    const currency = product?.currency || 'FCFA';
    return new Intl.NumberFormat('fr-fr',{style: "currency", currency:currency}).format(price);
  }

}
