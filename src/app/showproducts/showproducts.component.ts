import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-showproducts',
  templateUrl: './showproducts.component.html',
  styleUrls: ['./showproducts.component.css']
})
export class ShowproductsComponent implements OnInit{
  displayedColumns: string[] = ['Id', 'Product Name', 'Price', 'Category','Description'];
  productDetails:Product[]=[];

  constructor(private productService:ProductService){}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllProducts();
  }
  public getAllProducts()
  {
    this.productService.getAllProducts().subscribe(
      (resp:Product[])=>{
        console.log(resp);
        this.productDetails=resp;
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

}
