import { Component } from '@angular/core';
import { PanierDAOModel } from '../../models/panier-daomodel';
import { PanierService } from '../../services/panier.service';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { ProduitDAOModel } from '../../models/produitDAO.model ';
import { ArticleDAOModel } from '../../models/article-daomodel';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  panier?: PanierDAOModel;
  spinner: boolean = true;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private panierService: PanierService) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.panierService.panier$.subscribe({
      next: (panier: PanierDAOModel) => {
        this.spinner = false;
        this.panier = panier;
      }
    })
  }

  handleSetQuantite(event: any, produit?: ProduitDAOModel, quantite?: number) {
    if (quantite) {
      if (quantite == -1) {
        // retirer le produit du panier
        this.panierService.removeProduit(produit);
      }
      else if (quantite == 1) {
        // ajouter le produit au panier
        this.panierService.addProduit(produit);
      }
    }
    else {
      // recuperer la valeur de l'input
      const { value } = event.target;
      // tranformer cette valeur en nombre
      const newValue = parseInt(value);
      // si la valeur est un nombre valide
      if (!isNaN(newValue) && produit) {
        this.panierService.setProduitQuantite(produit, newValue)
      }
      else {
        event.target.value = 1
        if (produit)
          this.panierService.setProduitQuantite(produit, 1)
      }
    }
  }

  removeProduit(event:any, article?: ArticleDAOModel) {
    event.preventDefault(); 
    if (article && article.produitDAO) {
      this.panierService.removeProduit(article.produitDAO, article.quantite);
    }

  }
}
