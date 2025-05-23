import { Pipe, PipeTransform } from '@angular/core';
import { ProduitDAOModel } from '../models/produitDAO.model ';

@Pipe({
  name: 'formatSoldeRate'
})
export class FormatSoldeRatePipe implements PipeTransform {

  transform(produitDAO: ProduitDAOModel | any): string {
    const {prixRegulier,prixUnitaire} = produitDAO;
    // Vérifier si prixRegulier et prixUnitaire sont définis
    if (prixRegulier && prixUnitaire) {
      // Calculer le taux de réduction
      const tauxReduction = ((prixRegulier - prixUnitaire) / prixRegulier) * 100;
      // Formater le taux de réduction avec 2 décimales
      const tauxReductionFormate = tauxReduction.toFixed(0);
      // Retourner le taux de réduction avec le symbole de pourcentage
      return `${tauxReductionFormate}%`;
    }
    return ''; 
  }

}
