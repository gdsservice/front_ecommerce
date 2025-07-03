import { Component } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { CatProduitListModel } from '../../models/catProduitList.model';
import { lastValueFrom } from 'rxjs';
import { PanierService } from '../../services/panier.service';
import { PanierDAOModel } from '../../models/panier-daomodel';
import { ProductService } from '../../services/product.service';
import { ProduitDAOModel } from '../../models/produitDAO.model ';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  categorieStock: CatProduitListModel[] = [];
  panier?:PanierDAOModel;

  constructor(
    private categorieService:CategorieService, 
    private panierService: PanierService,
  ) {}

  // asynchronous initialization of component
  // using lastValueFrom to convert observable to promise
  // to handle the asynchronous nature of the data fetching
 async ngOnInit() {
  this.panierService.panier$.subscribe({
    next: (value:PanierDAOModel) => {
      this.panier = value;
    }
  })
  const categorieData = await lastValueFrom(this.categorieService.searchCategorie(1,6));
    if (categorieData) {
      this.categorieStock = categorieData;
    }
  }

  removeFromCart(event:any, produitDAO?: ProduitDAOModel, quantite?: number) {
    event.preventDefault();
    this.panierService.removeProduit(produitDAO, quantite)
  }

}
