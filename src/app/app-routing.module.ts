import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FaqComponent } from './components/faq/faq.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductComponent } from './components/product/product.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { AccountComponent } from './components/account/account.component';
import { AboutComponent } from './components/about/about.component';
import { ShopComponent } from './components/shop/shop.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "cart",
    component: CartComponent
  },
  {
    path: "wishlist",
    component: WishlistComponent
  },
  {
    path: "checkout",
    component: CheckoutComponent
  },
  {
    path: "fqa",
    component: FaqComponent
  },
  {
    path: "contact",
    component: ContactComponent
  },
  {
    path: "produit/:slug",
    component: SingleProductComponent
  },
    {
    path: "category/:slug",
    component: SingleProductComponent
  },
  {
    path: "shop/categorie/:slug",
    component: ShopComponent
  },
  {
    path: "account",
    component: AccountComponent
  },
  {
    path: "about",
    component: AboutComponent
  },
  {
    path: "shop",
    component: ShopComponent
  },
  
  {
    path: "signin",
    component: SigninComponent
  },
  {
    path: "signup",
    component: SignupComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
