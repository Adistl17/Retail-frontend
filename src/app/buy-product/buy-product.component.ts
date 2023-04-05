import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { OrderDetails } from '../_model/order-details.model';
import { OrderQuantity } from '../_model/order-quantity.model';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css'],
})
export class BuyProductComponent implements OnInit {
  order: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    orderProductQuantityList: [],
  };
  productDetails: Product[] = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.productDetails = this.activatedRoute.snapshot.data["productDetails"];
    this.productDetails.forEach((x) =>
      this.order.orderProductQuantityList.push({
        pid: x.pid,
        quantity: 1,
      })
    );

    console.log(this.productDetails);
    console.log(this.order);
    // for (var i = 0, j = 0; i < this.productDetails.length; i++) {
    //   this.productService.calcAmount(
    //     this.productDetails[i].pprice,
    //     this.order.orderProductQuantityList[j].quantity
    //   );
    // }
  }
  getQuantityForProduct(productId: number) {

    const filteredProduct = this.order.orderProductQuantityList.filter(
      (productQuantity) => {

        productQuantity.pid === productId;
      }
    );
    return filteredProduct[0].quantity;
  }

  placeOrder(orderForm: NgForm) {
    this.productService.placeOrder(this.order).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/paymentpage"]);

      },
      (err) => {
        console.log(err);
      }
    );
  }


  getCalculatedTotal(pid: any, pprice: any) {
    const filteredProduct = this.order.orderProductQuantityList.filter(
      (productQuantity) => productQuantity.pid === pid
    );

    return filteredProduct[0].quantity*pprice;
  }
  onQuantityChanged(quant: any, pid: any) {
    this.order.orderProductQuantityList.filter(
      (orderProduct) => orderProduct.pid === pid
    )[0].quantity = quant;
  }
  getCalculatedGrandTotal() {
    let total = 0;
    this.order.orderProductQuantityList.forEach((productQuantity) => {
       const price=this.productDetails.filter(
        (product) => product.pid === productQuantity.pid
      )[0].pprice;

      total = total + price* productQuantity.quantity;
    });
    return total;
  }
}
