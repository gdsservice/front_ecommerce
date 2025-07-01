import { Injectable } from '@angular/core';
import { PanierDAOModel } from '../models/panier-daomodel';
import { BehaviorSubject } from 'rxjs';
import { ProduitDAOModel } from '../models/produitDAO.model ';
import { ArticleDAOModel } from '../models/article-daomodel';
import { LocalStorageService } from './local-storage.service';
import { NotificationModel } from '../models/notification-model';
import { WebNotificationService } from './web-notification.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  panier: PanierDAOModel = new PanierDAOModel();

  panier$ = new BehaviorSubject<PanierDAOModel>(this.panier);

  constructor(
    private localStorageService: LocalStorageService,
    private notificationService: WebNotificationService,
    private productService: ProductService
  ) {
    const panier = this.localStorageService.getItem('panier');
    if (panier) {
      this.panier = panier;
      this.panier$.next(panier);
    } else {
      this.panier._id = this.generateId()
    }
  }

  private generateId(): string {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
  }

  addProduit(produitDAO?: ProduitDAOModel, quantite: number = 1) {
    if (produitDAO) {
      const imageUrl = this.productService.getImageUrls(produitDAO.idProd!, 1)[0];
      produitDAO.imageUrl = imageUrl;
      const articleIndex = this.panier.articles.findIndex((article: ArticleDAOModel) => article.produitDAO?.idProd === produitDAO.idProd);
      if (articleIndex != -1) {
        this.panier.articles[articleIndex].quantite += quantite;
        this.panier.articles[articleIndex].total = produitDAO?.prixUnitaire! * this.panier.articles[articleIndex].quantite;
      } else {
        const newArticle = new ArticleDAOModel();
        newArticle.produitDAO = produitDAO;
        newArticle.quantite = quantite;
        newArticle.total = produitDAO.prixUnitaire * quantite;
        this.panier.articles.push(newArticle);
      }
      let notification: NotificationModel = new NotificationModel();
      notification.message = produitDAO.designation + " ajouté au panier";
      notification.status = "success";
      this.notificationService.emitNotification(notification);
      this.updatePanier();
    }
  }

  removeProduit(produitDAO?: ProduitDAOModel, quantite: number = 1) {
    if (produitDAO) {
      const articleIndex = this.panier.articles.findIndex((article: ArticleDAOModel) => article.produitDAO?.idProd === produitDAO.idProd);
      if (articleIndex != -1) {
        if (this.panier.articles[articleIndex].quantite == 1) {
          this.panier.articles = this.panier.articles.filter((article: ArticleDAOModel) => article.produitDAO?.idProd !== produitDAO.idProd);
        } else {
          if (this.panier.articles[articleIndex].quantite > quantite) {
            this.panier.articles[articleIndex].quantite -= quantite;
            this.panier.articles[articleIndex].total = produitDAO?.prixUnitaire! * this.panier.articles[articleIndex].quantite;
          } else {
            this.panier.articles = this.panier.articles.filter((article: ArticleDAOModel) => article.produitDAO?.idProd !== produitDAO.idProd);
          }
        }
        let notification: NotificationModel = new NotificationModel();
        notification.message = produitDAO.designation + " supprimer du panier";
        notification.status = "danger";
        this.notificationService.emitNotification(notification);
        this.updatePanier()
      }
    }
  }

  removeAllProduits(produitDAO?: ProduitDAOModel) {
     if(produitDAO){
      this.panier.articles = [];
      this.panier.quantite = 0;
      this.panier.total = 0;
      let notification: NotificationModel = new NotificationModel();
      notification.message = `
        <i class="bi bi-check-circle-fill text-success"></i>
        <strong> Votre commande a été effectuée avec succès.</strong><br>
        <i class="bi bi-info-circle text-primary"></i>
        Nous vous contacterons très bientôt. Merci.
      `;
      notification.status = "primary";
      notification.timeout = 10000;
      this.notificationService.emitNotification(notification);
      this.updatePanier();
     }
  }

  updatePanier() {

    this.panier.quantite = 0
    this.panier.total = 0

    this.panier.articles.forEach((article: ArticleDAOModel) => {
      this.panier.quantite += article.quantite;
      if (article.produitDAO) {
        this.panier.total += article.produitDAO?.prixUnitaire * article.quantite;
      }
    }
    );
    this.localStorageService.setItem('panier', this.panier);
    this.panier$.next(this.panier);

  }

  setProduitQuantite(produitDAO: ProduitDAOModel, quantite: number) {
    if (produitDAO && quantite) {
      const imageUrl = this.productService.getImageUrls(produitDAO.idProd!, 1)[0];
      produitDAO.imageUrl = imageUrl;
      const articleIndex = this.panier.articles.findIndex((article: ArticleDAOModel) => article.produitDAO?.idProd === produitDAO.idProd);
      if (articleIndex != -1) {
        this.panier.articles[articleIndex].quantite = quantite;
        this.panier.articles[articleIndex].total = produitDAO?.prixUnitaire! * quantite;
      }
      let notification: NotificationModel = new NotificationModel();
      notification.message = produitDAO.designation + " modifier le panier";
      notification.status = "primary";
      this.notificationService.emitNotification(notification);
      this.updatePanier();
    }
  }
}
