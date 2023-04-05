import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
  public setUid(uid:number)
  {
    localStorage.setItem('uid',JSON.stringify(uid));
    console.log(uid);
  }
  public getToken(): string | null {
    return localStorage.getItem('token');
  }
  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getToken();
  }

}
