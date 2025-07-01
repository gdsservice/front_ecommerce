import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';
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

     public listProduitLimit(min:number=1, max:number=20): Observable<Array<ProduitDAOModel>> {
        return this.http.get<Array<ProduitDAOModel>>(`${environment.backendHost}/produit/limite?min=${min}&max=${max}`);
    }

  public getProduitBySlug(slug: string): Observable<ProduitDAOModel> {
    return this.http.get<ProduitDAOModel>(`${environment.backendHost}/produit/slug/${slug}`);
  }

  // Méthode pour rechercher des produits avec des paramètres
  public searchProduit(query: string): Observable<Array<ProduitDAOModel>> {
    return this.http.get<Array<ProduitDAOModel>>(`${environment.backendHost}/produit/recherche?${query}`);
}

  getImageUrls(idProd: string, count: number): string[] {
  const urls: string[] = [];
  for (let i = 0; i < count; i++) {
    urls.push(`${environment.backendHost}/images/produit/${idProd}?index=${i}`);
  }
  return urls;
}


  
}