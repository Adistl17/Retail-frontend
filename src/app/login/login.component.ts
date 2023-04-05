import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {}
  login(loginForm: NgForm) {
    // console.log(loginForm.value)
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setUid(response.user.uid);
        this.userAuthService.setToken(response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
