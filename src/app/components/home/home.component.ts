import { Component } from '@angular/core';
import { filter, map } from 'rxjs';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ProductService } from '../../services/product.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BannerService } from '../../services/banner.service';
import { BannerDAO } from '../../models/banner-dao';
import { CollectionDAO } from '../../models/collection-dao';
import { CollectionService } from '../../services/collection.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  banners: BannerDAO[] = [];

  collections: CollectionDAO[] = [];

  // products?: Array<ProduitDAOModel[]> = [];
  products: { [key: string]: ProduitDAOModel[] } = {};

  isLoading: boolean = true;

  // Pagination
  currentPage: { [key: string]: number } = {};
  pageSize: number = 6;


  constructor(
    private produitService: ProductService,
    private bannerService: BannerService,
    private collectionService: CollectionService,
    private router: Router,
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


  async ngOnInit() {
    const queries = [
      { key: 'nouveaute', value: 'nouveaute=true' },
      { key: 'plusVendu', value: 'plusVendu=true' },
      { key: 'vedette', value: 'vedette=true' },
      { key: 'offreSpeciale', value: 'offreSpeciale=true' }
    ];
    for (const query of queries) {
      this.produitService.searchProduit(query.value)
        .subscribe(
          data => {
            this.products[query.key] = data;
          }
        )
    }

    this.bannerService.listBanner()
      .pipe(
        map((banners: BannerDAO[]) => banners.map(banner => ({
          ...banner,
          imageUrl: banner.idBanner ? this.bannerService.getMainImageUrl(banner.idBanner) : ''
        })))
      )
      .subscribe(
        data => {
          this.banners = data.map(banner => ({
            ...banner,
            imageUrl: this.bannerService.getImageUrl(banner.idBanner!),
          }));

        },
        error => {
          console.error('Erreur lors du chargement des banner', error);
          this.isLoading = false;
        }
      );

    this.collectionService.listCollection()
      .pipe(
        map((collections: CollectionDAO[]) => collections.map(collection => ({
          ...collection,
          imageUrl: collection.idCollection ? this.collectionService.getMainImageUrl(collection.idCollection) : ''
        })))
      )
      .subscribe(
        data => {
          this.collections = data.map(collection => ({
            ...collection,
            imageUrl: this.collectionService.getImageUrl(collection.idCollection!),
          }));

        },
        error => {
          console.error('Erreur lors du chargement des collection', error);
          this.isLoading = false;
        }
      );
  }

  getPaginatedProducts(key: string): ProduitDAOModel[] {
    const page = this.currentPage[key] || 1;
    const products = this.products[key] || [];
    const startIndex = (page - 1) * this.pageSize;
    return products.slice(startIndex, startIndex + this.pageSize);
  }

  changePage(key: string, page: number) {
    this.currentPage[key] = page;
  }

}
