import { Component } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { CatProduitListModel } from '../../models/catProduitList.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  categorieStock: CatProduitListModel[] = [];

  constructor(private categorieService:CategorieService) {}

  async ngOnInit() {
    this.getCategorie();
  }

  getCategorie(){
    this.categorieService.searchCategorie().subscribe({
      next: (response) => {
        this.categorieStock = response;
      }
    });
  }

}
