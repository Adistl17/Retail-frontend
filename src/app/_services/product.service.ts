import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { async } from 'rxjs';
import { Cart } from '../_model/cart.mdoel';
import { OrderDetails } from '../_model/order-details.model';
import { OrderQuantity } from '../_model/order-quantity.model';
import { MyOrder } from '../_model/order.model';
import { Product } from '../_model/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpclient: HttpClient) {}
  product: Product = {
    pid: 0,
    pname: '',
    pprice: 0,
    pdesc: '',
    pcategory: '',
    productImages: [],
  };
  static a = 0;

  public getAllProducts(searchKeyword: string = '') {
    return this.httpclient.get<Product[]>(
      'http://localhost:8082/retail/products/?searchKey=' + searchKeyword
    );
  }

  public getById(productId: any) {
    return this.httpclient.get<Product>(
      'http://localhost:8082/retail/products/' + productId
    );
  }
  // public getByUId(productId: any) {
  //   return this.httpclient.get<Product[]>(
  //     'http://localhost:8082/retail/products/' + productId
  //   );
  // }
  public addToCart(cart: Cart) {
    return this.httpclient.post('http://localhost:8083/retail/carts/', cart);
  }
  public calcAmount(pprice: number, quantity: number) {
    ProductService.a = (pprice * quantity);
  }

  public getCartDetails() {
    return this.httpclient.get(
      'http://localhost:8083/retail/carts/user/' + localStorage.getItem('uid')
    );
  }
  public placeOrder(orderInput: OrderDetails) {
    let amount = ProductService.a;
    ProductService.a = 0;

    let uid = +localStorage.getItem('uid')!;
    return this.httpclient.post('http://localhost:8083/retail/order/', {
      orderInput,
      uid,
    });
  }
  public getProductDetails(productId:any)
  {
    return this.httpclient.get<Product[]>('http://localhost:8082/retail/products/getProductDetails/' + productId)

  }
  public deleteCartItem(pid:any){
    return this.httpclient.delete('http://localhost:8083/retail/carts/pid/'+pid)
  }
  public myOrder(uid:number)
  {
    return this.httpclient.get<MyOrder[]>( 'http://localhost:8083/retail/order/getOrderDetails/'+uid);

  }
}
