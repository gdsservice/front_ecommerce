import { Component, Input } from '@angular/core';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
import { PanierService } from '../../services/panier.service';
import { PanierDAOModel } from '../../models/panier-daomodel';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';


@Component({
  selector: 'app-product-item-list',
  templateUrl: './product-item-list.component.html',
  styleUrl: './product-item-list.component.css'
})
export class ProductItemListComponent {

  @Input() produitDAO?: ProduitDAOModel;
    imageUrl?: string;
    panier?:PanierDAOModel;
  
    constructor(
      @Inject(PLATFORM_ID) private platformId: Object,
      private productService: ProductService,
      private panierService: PanierService,
      private router: Router
    ) {}
  
  ngOnInit(): void {
      if (isPlatformBrowser(this.platformId)) {
    window.scrollTo(0, 0);
  }
      this.panierService.panier$.subscribe({
          next: (value:PanierDAOModel) => {
            this.panier = value;
          }
        })

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

  removeFromCart(event:any, produitDAO?: ProduitDAOModel, quantite?: number) {
    event.preventDefault();
    this.panierService.removeProduit(produitDAO, quantite)
  }

  addToCart(event: any){
    event.preventDefault();
    this.panierService.addProduit(this.produitDAO);
  }

  ajouterAuPanierAcheter(event: any) {
    event.preventDefault();
    this.panierService.addProduit(this.produitDAO, 1);
    this.router.navigate(['/checkout']);
  }

}
