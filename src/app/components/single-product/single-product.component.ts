import { Component } from '@angular/core';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { log } from 'console';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  slug: string | null = null;
  produitDAO?: ProduitDAOModel;
  existingImageUrl: string | null = null;
  imageUrls: string[] = [];
  mainImageUrl?: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produitService: ProductService
  ) { }

  ngOnInit(): void {
    this.slug = this.route.snapshot.paramMap.get('slug');
    if (this.slug) {
      this.loadProduct(this.slug);
    }
    
  }

  loadProduct(slug: string): void {
    this.produitService.getProduitBySlug(slug).subscribe({
      next: (prod: ProduitDAOModel) => {
        this.produitDAO = prod;
        this.imageUrls = this.produitService.getImageUrls(prod.idProd!, 4);
        this.mainImageUrl = this.imageUrls[0];
      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit:', err);
      }
    });
  }

  setMainImage(imageUrl: string): void {
    if (this.produitDAO) {
      this.produitDAO.imageUrl = imageUrl;
    }
  }



}
