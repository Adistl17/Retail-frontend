import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ResolveData, ResolveFn, RouterStateSnapshot } from '@angular/router';
import {  map, Observable, of } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from './image-processing.service';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {
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
  constructor(private productService: ProductService, private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot):Observable<Product>
  {
    const id=route.paramMap.get("pid");
    if(id)
    {
      return this.productService.getById(id).
      pipe(map(p=>this.imageProcessingService.createImages(p)));

    }
    else{
       return of(this.getProductDetails());

    }


  }



}
