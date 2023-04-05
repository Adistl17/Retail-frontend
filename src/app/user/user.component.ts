import { Component, OnInit } from '@angular/core';
import { MyOrder } from '../_model/order.model';
import { ProductService } from '../_services/product.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
  myOrder:MyOrder[]=[];
  constructor(private productService:ProductService){}
  ngOnInit(): void {
    this.getOrderDetails();
  }
  getOrderDetails(){
    const id=+localStorage.getItem('uid')!;
    this.productService.myOrder(id).subscribe(
      resp=>{console.log(resp)
      this.myOrder=resp},
      err=>{console.log(err)}
    );
  }

}
