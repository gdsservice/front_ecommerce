import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { BannerDAO } from '../models/banner-dao';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  constructor(private http: HttpClient) { }

  // methode recuperation de la liste
  public listBanner(): Observable<Array<BannerDAO>> {
    return this.http.get<Array<BannerDAO>>(`${environment.backendHost}/banner/listeBanner`);
  }

  getMainImageUrl(idBanner: string): string {
    return `${environment.backendHost}/images/banner/main/${idBanner}`;
  }

  getImageUrl(idBanner: string): string {
    return `${environment.backendHost}/images/banner/${idBanner}`;
  }
}
