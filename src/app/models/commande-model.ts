import { ClientModel } from "./client.model";


export interface CommandeModel{
    _id?: string;
    total: number;
    quantite: number;
    clientCde?: ClientModel,
    note?: string,
}