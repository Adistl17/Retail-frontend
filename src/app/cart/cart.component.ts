import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}
  ngOnInit(): void {
    this.getCartDetails();
  }
  displayedColumns: string[] = ['pid', 'pdesc', 'Category', 'Price','Action'];
  cartDetails: any[] = [];
  product: any[] = [];
  getCartDetails() {
    this.productService.getCartDetails().subscribe((response: any) => {
      console.log(response);
      let i = 0;

      console.log(this.product);
      for (let p of response) {
        this.productService.getById(p.pid).subscribe((respon: any) => {
          this.product[i] = respon;
          i++;
        },
        err=>console.log(err));
      }
    });
  }
  checkout() {
    let id = +localStorage.getItem('uid')!;
    this.router.navigate(['/buyproduct']);
  }
  delete(pid:any)
  {
    console.log(pid)
    this.productService.deleteCartItem(pid).subscribe(
      resp=>{console.log(resp)
      this.getCartDetails();},
      err=>{console.log(err)}

    );
  }
}
