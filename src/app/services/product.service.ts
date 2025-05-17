import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
import { ResponseGet } from '../models/response-get';
import { ProduitDAOModel } from '../models/produitDAO.model ';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer la liste des produits
  public listProduit(): Observable<Array<ProduitDAOModel>> {
    return this.http.get<Array<ProduitDAOModel>>(`${environment.backendHost}/produit/listeProd`);
  }

  // Méthode pour rechercher des produits avec des paramètres
  public searchProduit(entity: string, query: string): Observable<Array<ProduitDAOModel>> {
    return this.http.get<Array<ProduitDAOModel>>(`${environment.backendHost}/produit/recherche?${query}`);
}

  getImageUrl(idProd: string): string {
    return `${environment.backendHost}/produit/image/${idProd}`;
  }

  
}