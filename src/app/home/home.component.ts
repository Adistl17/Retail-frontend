import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../_model/product.model';
import { ImageProcessingService } from '../_services/image-processing.service';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
      this.getAllProducts();
  }
  productDetails: Product[] = [];
  constructor(private productService: ProductService, private imageProcessingService: ImageProcessingService, private router: Router){}

  searchByKeyword(searchkeyword:string)
  {
    this.productDetails=[];
    this.getAllProducts(searchkeyword);

  }
  public getAllProducts(searchKey: string="")
  {
    this.productService.getAllProducts(searchKey)
    .pipe(
      map((x:Product[],i)=>x.map((product: Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp:Product[])=>{
        console.log(resp);
      this.productDetails=resp;},
        (error:HttpErrorResponse)=>{console.log(error);}



    );
  }
  showProductDetails(pid:number){
    //console.log(pid);
    this.router.navigate(['/productViewDetails',{pid:pid}]);

  }

}
