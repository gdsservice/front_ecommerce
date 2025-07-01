import { ArticleDAOModel } from "./article-daomodel";

export class PanierDAOModel {
    _id?: string;
    quantite: number = 0;
    total: number = 0;
    articles: Array<ArticleDAOModel> = [];
    dateCreation?: Date;
}
