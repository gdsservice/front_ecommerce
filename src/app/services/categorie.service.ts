import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  CatProduitListModel } from '../models/catProduitList.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.dev';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) { }

      public searchCategorie(min:number=1, max:number=1): Observable<Array<CatProduitListModel>> {
      return this.http.get<Array<CatProduitListModel>>(`${environment.backendHost}/categorie/recherche?min=${min}&max=${max}`);
  }
}
