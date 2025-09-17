import { Component } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { PanierDAOModel } from '../../models/panier-daomodel';
import { PanierService } from '../../services/panier.service';
import { CommandeService } from '../../services/commande.service';
import { ClientService } from '../../services/client.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClientModel } from '../../models/client.model';
import { CommandeInputModel } from '../../models/commandeInput-model';
import { CommandeModel } from '../../models/commande-model';
import { ProduitModel } from '../../models/produit.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {

  panier?: PanierDAOModel;
  spinner: boolean = true;
  clientListForm!: FormGroup<any>;
  clientNew?: ClientModel;
  listCdeProd: any[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private panierService: PanierService,
    private fb: FormBuilder,
    private commandeService: CommandeService,
    private clientService: ClientService,
    private router: Router,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.panierService.panier$.subscribe({
      next: (panier: PanierDAOModel) => {
        this.spinner = false;
        this.panier = panier;
      }
    })

    // Initialisation du formulaire
    this.clientListForm = this.fb.group({
      nom: [''],
      prenom: [''],
      adresse: [''],
      telephone: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{8}$/), 
      ]],
      email: [''],
      note: ['']
    });
  }

  ajouterClientEtEnregistrerCde() {
    if (this.clientListForm.invalid) {
      this.clientListForm.markAllAsTouched();
      return;
    }

    const nouveauClient: ClientModel = {
      idClient: null,
      nom: this.clientListForm.value.nom,
      prenom: this.clientListForm.value.prenom,
      adresse: this.clientListForm.value.adresse,
      telephone: this.clientListForm.value.telephone,
      email: this.clientListForm.value.email,
      publier: true

    };
    this.clientService.ajoutClient(nouveauClient).subscribe({
      next: (client) => {
        this.clientNew = client;
        // Enregistrer la vente avec le nouveau client
        this.effectuerCde();
      },
      error: (err) => {
        // ClientDuplicateException

      },
    });
  }

  effectuerCde() {
    if (!this.panier || !this.panier.articles || this.panier.articles.length === 0) {
      console.error("Panier vide");
      return;
    }
    // Création de la commande
    const commande: CommandeModel = {
      total: this.panier.total,
      quantite: this.panier.quantite,
      clientCde: this.clientNew,
      note: this.clientListForm.value.note,
    };

    // Création de la liste des produits commandés
    const listCommandeProduit = this.panier.articles
      .filter(article => article.produitDAO !== undefined)
      .map(article => ({
        quantite: article.quantite,
        montant: article.produitDAO ? article.quantite * article.produitDAO.prixUnitaire : 0,
        produit: article.produitDAO as ProduitModel,
        commande: commande
      }));

    // Création du modèle d'entrée pour l'API
    const commandeInput: CommandeInputModel = {
      commande,
      listCommandeProduit
    };

    // Appel du service backend
    console.log(commandeInput);
    
    this.commandeService.ajoutCommande(commandeInput).subscribe({
      next: (response) => {
        console.log('Commande effectuée avec succès', response);
        this.clientListForm.reset();
        this.panierService.removeAllProduits(listCommandeProduit[0].produit); 
        this.router.navigate(['/']); 
      },
      error: (error) => {
        console.error('Erreur lors de l\'effectuation de la commande', error);
      }
    });
  }

}






