import { CategoryModel } from "./category-model"

export class ProductModel {
    _id : string = ""
    name : string = ""
    slug : string = ""
	description : string = ""
	stock : number = 9
	solde_price : number = 9
	regular_price : number = 19
	category : Array<CategoryModel> = []
	brand : string = ""
	imageUrls : Array<any> = []
	currency : string = "FCFA"
	status : boolean = false
	availability : boolean = false
	position  : number = 0 
	// variation
	options : Object = []
	updated_at  : Date | null= null
	created_at  : Date | null= null
	isNewArrival: boolean = false
	isBestSeller: boolean = false
	isFeatured: boolean = false
	isSpecialOffer: boolean = false
    
    constructor(){}
}
