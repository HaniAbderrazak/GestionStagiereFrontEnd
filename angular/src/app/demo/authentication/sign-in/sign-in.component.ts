import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import FormBuilder and Validators
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export default class SignInComponent implements OnInit{


  formLogin !:FormGroup
 motDePasse:string=""
 email:string=""
 showPassword: boolean = false; 
 error:string='';
 errorVisible:boolean=false;

  constructor(private fb:FormBuilder ,
    private authService:AuthServiceService,
    private router:Router,
    private route: ActivatedRoute
   
    ){
    

  }
  ngOnInit(): void {
        if(this.authService.isAuthenticated==true)
        {
           if(this.authService.roles.includes("ADMIN"))
          {
            this.router.navigateByUrl("admin/offres") 
          }
          else
          this.router.navigateByUrl("Stagiere");
        }
        this.formLogin = this.fb.group({
          username: ['', [Validators.required, Validators.email]], // Use Validators.email for email validation
          password: ['', Validators.required]
        });
        
}
handleLogin() {
  let username=this.formLogin.value.username;
  let password=this.formLogin.value.password;
    this.authService.login(username,password).subscribe(
      
        value => {
         
          if (value.hasOwnProperty('error') && value.hasOwnProperty('message'))
           {

            // Handle error case
            this.errorVisible = true;
            this.error=" there is no account with this email ";
           }
           else{
            this.authService.loadService(value)
                if(this.authService.roles.includes("ADMIN"))
                {
                     this.router.navigateByUrl("admin/offres") 
                     console.log(value)
                }
                else
                {this.router.navigateByUrl("Stagiere");}    
        }},
        err=> {
          this.errorVisible=true;
          this.error="invalid password"
        }
    )
  } 
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword; // Toggle the password visibility
  }


}
