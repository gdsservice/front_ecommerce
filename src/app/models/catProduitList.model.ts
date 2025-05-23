import { CategorieModel } from "./categorie.model ";
import { ProduitModel } from "./produit.model";
import { ProduitDAOModel } from "./produitDAO.model ";

export interface CatProduitListModel{

  categorieStock: CategorieModel,
  produitList: ProduitDAOModel[];
}
