import { Component, Input } from '@angular/core';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input() produitDAO?: ProduitDAOModel;
  imageUrl?: string;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    if (this.produitDAO?.idProd) {
      this.imageUrl = this.productService.getImageUrl(this.produitDAO.idProd);
      this.produitDAO.imageUrl = this.imageUrl;
    }
  }

}
