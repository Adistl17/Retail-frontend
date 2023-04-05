import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyProductComponent } from './buy-product/buy-product.component';
import { CartComponent } from './cart/cart.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { ProductViewDetailsComponent } from './product-view-details/product-view-details.component';
import { ShowproductsComponent } from './showproducts/showproducts.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { BuyProductResolverService } from './_services/buy-product-resolver.service';
import { ProductResolverService } from './_services/product-resolver.service';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'showproducts',
    component: ShowproductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'productViewDetails',
    component: ProductViewDetailsComponent,
    resolve: { product: ProductResolverService },
  },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'buyproduct', component: BuyProductComponent, resolve: { productDetails: BuyProductResolverService } },
  { path: 'paymentpage', component: PaymentPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
