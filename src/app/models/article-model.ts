import { ProduitDAOModel } from "./produitDAO.model ";

export class ArticleModel {
    produit?: ProduitDAOModel
    quantite: number = 0;
    total: number = 0;
}
