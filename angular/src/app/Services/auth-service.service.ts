import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
 
  authStateLoaded: boolean = false; 
  isAuthenticated:boolean=false
  roles :any;
  username: any;
  userId:any;
  AccesToken !: any;
  constructor(private http:HttpClient,
    private router:Router
    ) { }

  public login(username:string,password:string)
  {
    let options={
      headers :new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params=new HttpParams().set("username",username)
    .set("password",password)
   let result= this.http.post("http://localhost:8080/auth/login",params,options);
   return result;
  }
  loadService(value: any) {
    this.isAuthenticated=true
    this.AccesToken=value['access-token'];
    let jwtdecode:any =jwtDecode(this.AccesToken);
    this.username=jwtdecode.sub;
    this.roles=jwtdecode.scope;
    this.userId = jwtdecode.userId;
    window.localStorage.setItem("jwt-Token",this.AccesToken);
  }
  logout() {
    this.isAuthenticated=false;
    this.AccesToken=undefined
    this.username=undefined
    this.roles=undefined
    this.userId=undefined
    window.localStorage.clear()
  }
  loadJwtTokenFromLocalStorage()
  {
    if (!this.authStateLoaded) { 
    let token =window.localStorage.getItem("jwt-Token");
    if(token)
    {
      this.loadService({"access-token": token});
      
    }
    this.authStateLoaded = true;
  }
  }
}
