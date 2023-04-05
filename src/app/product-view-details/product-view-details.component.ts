import { HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../_model/cart.mdoel';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-product-view-details',
  templateUrl: './product-view-details.component.html',
  styleUrls: ['./product-view-details.component.css'],
})
export class ProductViewDetailsComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  product: Product = {
    pid: 0,
    pname: '',
    pprice: 0,
    pdesc: '',
    pcategory: '',
    productImages: [],
  };
  cart: Cart = {
    cid: 0,
    pid: 0,
    uid: 0,
  };

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
    console.log(this.product);
  }
  selectedProductIndex = 0;
  changeIndex(index: any) {
    this.selectedProductIndex = index;
  }
  addToCart(pid: any) {
    if (this.userAuthService.isLoggedIn()) {
      this.cart.uid = +(localStorage.getItem('uid') || '{}');
      this.cart.pid = pid;
      this.productService.addToCart(this.cart).subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(this.cart.uid);
    } else {
      this.router.navigate(['login']);
      console.log('Login first');
    }
  }
}
