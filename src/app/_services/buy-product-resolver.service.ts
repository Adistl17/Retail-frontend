import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { OrderDetails } from '../_model/order-details.model';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class BuyProductResolverService implements Resolve<Product[]> {
  getProductDetails(){
    return{
      pid:0,
      pname:"",
      pprice:0,
      pdesc:"",
      pcategory:"",
      productImages:[],
    };
  }
  product: Product[] = [];
  order: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    orderProductQuantityList: [],
  };

  constructor(private productService: ProductService,private imageProcessing:ImageProcessingService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Product[] | Observable<Product[]> | Promise<Product[]> {

    return this.productService.getProductDetails(+localStorage.getItem('uid')!).
    pipe(
      map(
        (x,i)=>x.map((product:Product)=>this.imageProcessing.createImages(product))
    ));
    }


  }
