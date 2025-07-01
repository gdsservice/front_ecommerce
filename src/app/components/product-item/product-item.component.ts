import { Component, Input } from '@angular/core';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {

  @Input() produitDAO?: ProduitDAOModel;
  imageUrl?: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productService: ProductService,
    private router: Router,
    private panierService: PanierService) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    if (this.produitDAO?.idProd) {
      this.imageUrl = this.productService.getImageUrls(this.produitDAO.idProd, 1)[0];
      this.produitDAO.imageUrl = this.imageUrl;
    }
  }

  naviguerVersDetailProduit(slug: string | null) {
    if (slug) {
      this.router.navigate(['/produitDAO', slug]);
    }
  }

  ajouterAuPanier(event: any) {
    event.preventDefault();
    this.panierService.addProduit(this.produitDAO, 1);
  }

  ajouterAuPanierAcheter(event: any) {
    event.preventDefault();
    this.panierService.addProduit(this.produitDAO, 1);
    this.router.navigate(['/checkout']);
  }
}
