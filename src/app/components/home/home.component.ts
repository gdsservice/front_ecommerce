import { Component } from '@angular/core';
import { lastValueFrom, filter } from 'rxjs';
import { BannerModel } from '../../models/banner-model';
import { CollectionModel } from '../../models/collection-model';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ProductService } from '../../services/product.service';
import { Inject, PLATFORM_ID } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  banners: BannerModel[] = [
    {
      titre1: "Profitez d'une connexion longue portée fiable et stable, idéale pour les zones rurales",
      titre2: "Ubquiti LiteBeam M5",
      imageUrl: 'assets/imgBG/litebeambaniere.png',
      btn_text: "Acheter maintenant",
      btn_link: "/produitDAO/m5",
    },
    {
      imageUrl: 'assets/imgBG/hp.png',
      titre1: "Travaillez et créez sans limites avec le HP EliteBook Core i5, puissant et élégant",
      titre2: "HP Elitebook Core i5",
      btn_text: "Payer maintenant",
      btn_link: "/produitDAO/hp",
    },
    {
      imageUrl: 'assets/imgBG/booster.png',
      titre1: "Démarrez votre véhicule facilement et gonflez vos pneus en toute sécurité et avec plus de confort",
      titre2: "Booster de véhicule",
      btn_text: "Voir plus",
      btn_link: "/produitDAO/booster",
    },

    {
      imageUrl: 'assets/imgBG/l009.png',
      titre1: "Améliorez votre confort et vos performances avec des équipements technologiques de pointe conçus pour une expérience immersive et fluide.",
      titre2: "Microtik hAP L009",
      btn_text: "Acheter maintenant",
      btn_link: "/produitDAO/l009",
    }
  ];

  collections: CollectionModel[] = [
    {
      imageUrl: 'assets/imgBG/xiaomi.png',
      titre1: "Super Prix",
      titre2: "Xiaomi Tv Box S",
      btn_text: "Voir plus",
      btn_link: "/shop",
    },
    {
      imageUrl: 'assets/imgBG/m5cl.png',
      titre1: "Super Prix",
      titre2: "Ubquiti NSM2",
      btn_text: "Voir plus",
      btn_link: "",
    }
  ];

  // products?: Array<ProduitDAOModel[]> = [];
  products: { [key: string]: ProduitDAOModel[] } = {};

  isLoading: boolean = true;



  constructor(
    private produitService: ProductService,
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
  }
}
