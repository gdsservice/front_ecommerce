import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactComponent } from './components/contact/contact.component';
import { FaqComponent } from './components/faq/faq.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SubscribeNewLetterComponent } from './components/subscribe-new-letter/subscribe-new-letter.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { CartComponent } from './components/cart/cart.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AccountComponent } from './components/account/account.component';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { ShopComponent } from './components/shop/shop.component';
import { TopPageComponent } from './components/top-page/top-page.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductComponent } from './components/product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { BannerComponent } from './components/banner/banner.component';
import { CollectionComponent } from './components/collection/collection.component';
import { AwaitloadingComponent } from './components/awaitloading/awaitloading.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { FormatImageUrlPipe } from './pipes/format-image-url.pipe';
import { TabProductContainerComponent } from './components/tab-product-container/tab-product-container.component';
import { CommonModule } from '@angular/common';
import { FormatPricePipe } from './pipes/format-price.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    FaqComponent,
    WishlistComponent,
    NotFoundComponent,
    SubscribeNewLetterComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    CartComponent,
    SigninComponent,
    SignupComponent,
    AccountComponent,
    SingleProductComponent,
    ShopComponent,
    TopPageComponent,
    CheckoutComponent,
    ProductComponent,
    BannerComponent,
    CollectionComponent,
    AwaitloadingComponent,
    ProductItemComponent,
    FormatImageUrlPipe,
    TabProductContainerComponent,
    FormatPricePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
