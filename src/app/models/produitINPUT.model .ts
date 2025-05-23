import {CategorieModel} from "./catProduitList.model";

export interface ProduitINPUTModel{
  idProd: string | null,
  designation: string,
  quantite: number,
  prixUnitaire: number,
  image: any,
  categorieStockProdDTO: CategorieModel,
  note: string,
}
