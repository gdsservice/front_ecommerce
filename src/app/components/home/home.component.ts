import { Component } from '@angular/core';
import { EntityService } from '../../services/entity.service';
import { lastValueFrom, Subscription } from 'rxjs';
import { BannerModel } from '../../models/banner-model';
import { CollectionModel } from '../../models/collection-model';
import { ResponseGet } from '../../models/response-get';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ProductService } from '../../services/product.service';
import { log } from 'node:console';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {

  banners: BannerModel[] = [
    {
      titre1: "21% de réduction sur tous vos achats",
      titre2: "Univers d'informatique",
      imageUrl: 'assets/images/banner4.png',
      btn_text: "Acheter maintenant",
      btn_link: "#",
    },
    {
      imageUrl: 'assets/images/banner1.png',
      titre1: "Bénéficiez jusqu'à 50 % de réduction aujourd'hui seulement !",
      titre2: "Boutique d'électronique",
      btn_text: "Payer maintenant",
      btn_link: "#",
    },
    {
      imageUrl: 'assets/images/banner3.png',
      titre1: "Achetez plus et dépensez moins",
      titre2: "Boutique de matériels divers",
      btn_text: "Voir plus",
      btn_link: "#",
    },
    {
      imageUrl: 'assets/images/banner2.png',
      titre1: "Faites passer votre expérience visuelle au niveau supérieur",
      titre2: "La boutique du monde",
      btn_text: "Acheter maintenant",
      btn_link: "#",
    }
  ];

  collections: CollectionModel[] = [
    {
      imageUrl: 'assets/images/shop_banner_img5.jpg',
      titre1: "Super Sale",
      titre2: "New Collection",
      btn_text: "Voir plus",
      btn_link: "#",
    },
    {
      imageUrl: 'assets/images/shop_banner_img5.jpg',
      titre1: "Super Sale",
      titre2: "New Collection",
      btn_text: "Voir plus",
      btn_link: "#",
    },
  ];

  products?: Array<ProduitDAOModel[]> = [];



  constructor(private produitService: ProductService) { }

  async ngOnInit() {
    
    this.getProducts()
  }

  async getProducts() {
    const queries = [
      "nouveaute=true",
      "vedette=true",
      "offreSpeciale=true"
    ];
  
    for (const query of queries) {
      const productsData: any = await lastValueFrom(this.produitService.searchProduit('product', query));
      console.log(productsData);
      if (productsData) {
        const currentProductsData: any = productsData;
        this.products?.push(currentProductsData);
      }
    }
  }
  



}
