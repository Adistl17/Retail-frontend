import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private userService:UserService, private router:Router){}
  register(registerForm:NgForm)
  {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response)=>{this.router.navigate(['/login']); },
      (error)=>{
        console.log(error);
      }
    );

  }

}
