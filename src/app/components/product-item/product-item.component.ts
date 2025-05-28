import { Component, Input } from '@angular/core';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../models/product-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input() produitDAO?: ProduitDAOModel;
  imageUrl?: string;
  product: ProductModel|undefined;

  constructor(private productService: ProductService,private router: Router) {}

  ngOnInit(): void {
    if (this.produitDAO?.idProd) {
      // Supposons 1 image par produit (ou adapte dynamiquement si besoin)
      this.imageUrl = this.productService.getImageUrls(this.produitDAO.idProd, 1)[0];
      this.produitDAO.imageUrl = this.imageUrl;
    }
  }

  naviguerVersDetailProduit(slug: string | null) {
  if (slug) {
    this.router.navigate(['/produitDAO', slug]);
  }}

}
