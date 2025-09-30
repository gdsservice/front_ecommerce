import { Component } from '@angular/core';
import { CatProduitListModel } from '../../models/catProduitList.model';
import { CategorieService } from '../../services/categorie.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  
    categorieStock: CatProduitListModel[] = [];
  
    constructor(
      private categorieService:CategorieService, 
    ) {}
  
   async ngOnInit() {
    const categorieData = await lastValueFrom(this.categorieService.searchCategorie(1,10));
      if (categorieData) {
        this.categorieStock = categorieData;
      }
    }
}
