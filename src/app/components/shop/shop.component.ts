import { Component } from '@angular/core';
import { CatProduitListModel } from '../../models/catProduitList.model';
import { CategorieService } from '../../services/categorie.service';
import { lastValueFrom,filter } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { PanierService } from '../../services/panier.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

  categorieStock: CatProduitListModel[] = [];
  productsList: ProduitDAOModel[] = [];
  isGrid: boolean = true;
  categorieSlug?: string;
  produitDAO?: ProduitDAOModel;

  constructor(
    private categorieService: CategorieService,
    private produitService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private panierService: PanierService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { 
    router.events.pipe(
      filter((event => event instanceof NavigationEnd))
    ).subscribe({
      next: ()=>{
        this.ngOnInit();
      }
    });
    
  }

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
        window.scrollTo(0, 0);
      }
    const urls = this.route.snapshot.url;
    const categorieData = await lastValueFrom(this.categorieService.getAllCategorie());
    if (categorieData) {
      this.categorieStock = categorieData;
    }
    if (urls.length == 1 && urls[0].path === "shop") {
      const productsData = await lastValueFrom(this.produitService.listProduitLimit(1, 8));
      if (categorieData && productsData) {
        this.productsList = productsData;
      }
    }
    else if (urls.length == 3
      && urls[0].path === "shop"
      && urls[1].path === "categorie") {
        this.categorieSlug = urls[2].path

        const currentCategorie = await lastValueFrom( this.categorieService.getCategorieBySlug(this.categorieSlug));
        if (currentCategorie) {
          this.productsList = currentCategorie.produitList;
        }
    }
  }

  setDisplay() {
    this.isGrid = !this.isGrid;
  }

  handleSetDisplay(event: any) {
    event.preventDefault();
    this.setDisplay();
  }

  

}
