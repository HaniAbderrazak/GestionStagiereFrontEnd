import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Router, RouterModule } from '@angular/router';
import { StagiereService } from '../../Services/StagiereService';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export default class SignUpComponent implements OnInit {
name:string ="";
email:string ="";
showPassword: boolean = false; 
formLogin !:FormGroup
password:string ="";
confirmPassword:string ="";
error:string='';
errorVisible:boolean=false;
constructor(private StagiereServ:StagiereService,private router:Router,private fb:FormBuilder ,
  
  ){

}
  ngOnInit(): void {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }
onRegister(): void {
  const data={
    "nom":this.name ,
    "email":this.email,
    "motDePasse": this.password
  }
  if(this.password===this.confirmPassword)
  {
    this.StagiereServ.addStagiere(data).subscribe(elem=>{
      console.log("succes");
      this.router.navigateByUrl("login")

    },error=>
    {
      this.errorVisible=true
      this.error="email is exist "
    }
    )
   
  }
  else {
    this.errorVisible=true
    this.error="confirm password invalid"
  }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Toggle the password visibility
  }
 
}

