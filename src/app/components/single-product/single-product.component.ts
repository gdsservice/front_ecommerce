import { Component } from '@angular/core';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ProductService } from '../../services/product.service';
import { CatProduitListModel } from '../../models/catProduitList.model';
import { CategorieService } from '../../services/categorie.service';
import { PanierService } from '../../services/panier.service';
import { PanierDAOModel } from '../../models/panier-daomodel';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent {

  slug: string | null = null;
  produitDAO?: ProduitDAOModel;
  imageUrlRelative: string[] | null = null;
  imageUrls: string[] = [];
  mainImageUrl?: string;
  categorieStock: CatProduitListModel[] = [];
  produitRelative: ProduitDAOModel[] = [];
  panier?: PanierDAOModel;
  quantite: number = 1;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private produitService: ProductService,
    private panierService: PanierService,
    private categorieService: CategorieService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    router.events.pipe(
      filter((event => event instanceof NavigationEnd))
    ).subscribe({
      next: () => {
        this.ngOnInit();
      }
    });
  }



  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
    this.panierService.panier$.subscribe({
      next: (value: PanierDAOModel) => {
        this.panier = value;
      }
    })

    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.loadProduct(slug);
      }
    });

  }

  scrollToDescription() {
    const descriptionElement = document.getElementById('scroll');
    if (descriptionElement) {
      descriptionElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  isDescriptionCollapsed: boolean = true;

  get shortDescription(): string {
    const desc = this.produitDAO?.description || ' ';
    const lines = desc.split('\n');
    return lines.slice(0, 5).join('\n');
  }


  setQuantie(event: any, quantite: number = 0) {
    if (!event) {
      this.quantite += quantite;
      if (this.quantite <= 0) {
        this.quantite = 1;
      }
    } else {
      event.preventDefault();
      const value = event.target.value;
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue)) {
        this.quantite = newValue;
      } else {
        this.quantite = 1;
      }

    }


  }

  addToCart(event: any) {
    event.preventDefault();
    this.panierService.addProduit(this.produitDAO, this.quantite);
  }

  loadProduct(slug: string) {
    this.produitService.getProduitBySlug(slug).subscribe({
      next: (prod: ProduitDAOModel) => {
        this.produitDAO = prod;
        this.imageUrls = this.produitService.getImageUrls(prod.idProd!, 4);
        this.mainImageUrl = this.imageUrls[0];
        this.getProduitByCategorie();
      },
      error: (err) => {
        console.error('Erreur lors du chargement du produit:', err);
      }
    });
  }


  getProduitByCategorie() {
    this.categorieService.searchCategorie(1, 5).subscribe({
      next: (response) => {
        this.categorieStock = response;
        // recuperer uniquement les produits de la categorie courante
        if (this.produitDAO) {
          const currentCategory = this.categorieStock.find(cat => cat.categorieStock.idCat === this.produitDAO?.categorieStockProdDTO.idCat);
          // console.log(this.imageUrlRelative) 
          if (currentCategory) {
            this.produitRelative = currentCategory.produitList;
            console.log(this.produitRelative);
            
            for (const prod of this.produitRelative) {
              // if (prod.idProd === this.produitDAO?.idProd) {
              //   continue;
              // }
              const imageUrls = this.produitService.getImageUrls(prod.idProd!, 1);
              if (imageUrls.length > 0) {
                prod.imageUrl = imageUrls[0];
              }
            }
          }
        }
      }
    });
  }

  naviguerVersDetailProduit(slug: string | null) {
    if (slug) {
      this.router.navigate(['/produitDAO', slug]);
    }
  }

  ajouterAuPanierAcheter(event: any) {
    event.preventDefault();
    this.panierService.addProduit(this.produitDAO, 1);
    this.router.navigate(['/checkout']);
  }

  ajouterAuPanier(event: any) {
    event.preventDefault();
    this.panierService.addProduit(this.produitDAO, 1);
  }



}
