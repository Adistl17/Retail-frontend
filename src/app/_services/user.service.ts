import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  PATH_OF_USER = 'http://localhost:8081';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(private httpclient: HttpClient) {}
  public login(loginData: any) {
  return this.httpclient.post(this.PATH_OF_USER + '/api/auth/login', loginData, {
    headers: this.requestHeader
  });
}
public register(registerData:any)
{
  return this.httpclient.post(this.PATH_OF_USER+'/api/auth/register',registerData)
}
}
