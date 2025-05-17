import { BannerComponent } from "../components/banner/banner.component";
import { CollectionComponent } from "../components/collection/collection.component";
import { ProductComponent } from "../components/product/product.component";
import { CategoryModel } from "./category-model";

export class ResponseGet {
    isSuccess? : Boolean;
    results? : Array<ProductComponent|CategoryModel|CollectionComponent|BannerComponent>;

}
