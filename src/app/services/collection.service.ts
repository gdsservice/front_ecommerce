import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionDAO } from '../models/collection-dao';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }
  
    // methode recuperation de la liste
    public listCollection(): Observable<Array<CollectionDAO>> {
      return this.http.get<Array<CollectionDAO>>(`${environment.backendHost}/collections/listeCollection`);
    }
  
    getMainImageUrl(idCollection: string): string {
      return `${environment.backendHost}/images/collections/main/${idCollection}`;
    }
  
    getImageUrl(idCollection: string): string {
      return `${environment.backendHost}/images/collections/${idCollection}`;
    }
}
