export interface ClientModel{

  idClient: string | null,
  nom: string,
  prenom: string,
  adresse: string,
  telephone: string,
  email: string,
  publier?:boolean,
  dateAjout?: string,
  utilisateurClient?: ClientModel,
}
