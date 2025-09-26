import { Component } from '@angular/core';
import { lastValueFrom, filter, map } from 'rxjs';
import { BannerModel } from '../../models/banner-model';
import { CollectionModel } from '../../models/collection-model';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ProductService } from '../../services/product.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BannerService } from '../../services/banner.service';
import { BannerDAO } from '../../models/banner-dao';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  banners: BannerDAO[] = [];

  collections: CollectionModel[] = [
    {
      imageUrl: 'assets/imgBG/xiaomi1.png',
      sous_titre: "Super Deal",
      titre: "Xiaomi Tv Box S",
      btn_text: "Voir plus",
      btn_link: "/shop",
    },
    {
      imageUrl: 'assets/imgBG/booster1.png',
      sous_titre: "Achetez, soyez satisfait",
      titre: "Booster de voiture",
      btn_text: "Voir plus",
      btn_link: "",
    }
  ];

  // products?: Array<ProduitDAOModel[]> = [];
  products: { [key: string]: ProduitDAOModel[] } = {};

  isLoading: boolean = true;



  constructor(
    private produitService: ProductService,
    private bannerService: BannerService,
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
  }
}
