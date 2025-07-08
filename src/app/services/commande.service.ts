import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CommandeInputModel } from '../models/commandeInput-model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private http: HttpClient) {}

  ajoutCommande(commandeInput: CommandeInputModel) {
    return this.http.post<CommandeInputModel>(`${environment.backendHost}/commande/effectuerCde`, commandeInput, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }
}
