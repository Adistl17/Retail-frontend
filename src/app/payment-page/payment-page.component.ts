import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent {
  constructor(private router:Router) {}



  PaymentOrder(PaymentForm:NgForm)
  {
    alert("Payment Completed")
    this.router.navigate(["/"])




  }

}
