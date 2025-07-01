import { ArticleModel } from "./article-model";

export class PanierModel {
    _id?: string;
    quantite: number = 0;
    total: number = 0;
    articles: Array<ArticleModel> = [];
    dateCreation?: Date;
}
