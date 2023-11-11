import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { DemandeService } from 'src/app/demo/Services/DemandeService';
import { StagiereService } from 'src/app/demo/Services/StagiereService';

@Component({
  selector: 'app-edit-profile',
  templateUrl:'./edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
Offres:Array<any>=[]
username:any;
isAuthenticated:any
error:any;
isButtonClicked: boolean[] = [];
alert:string="alert-warning"
stagiere: any;
image:any;
nom:string ='' ;
prenom:string='';
telephone:number=0;
email:string="";
motDePasse:string=""
Faculte:string="";
Cv:any | undefined;
imagePreview: string | ArrayBuffer | null = null;
adresse :string=""
role:any;
 demande:any=null;
  constructor(
    private authService:AuthServiceService,
    private stagiereServ: StagiereService,

    private router:Router
    ) {
        this.username=this.authService.username;
        this.role=this.authService.roles.includes("ROLE_ADMIN")
        this.stagiereServ.getStagiereById(this.authService.userId).subscribe(elem=>
          {
            this.stagiere=elem
            this.nom=this.stagiere.nom;
            this.prenom=this.stagiere.prenom;
            this.telephone=this.stagiere.tel;
            this.email=this.stagiere.email;
            this.Faculte=this.stagiere.faculte;
            this.Cv=this.stagiere.Cv;
            this.image=this.stagiere.image;
           
            this.adresse=this.stagiere.adresse
          });
          if(this.image===null)
         { this.imagePreview="/assets/images/UserAvatar.jpg"}

      }
    
  onImageChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.image = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.image = reader.result;
      };
      reader.readAsDataURL(file);
    
    }
  }
 ngOnInit(): void {
 
  this.authService.loadJwtTokenFromLocalStorage();
  }
   
 

 scroll = (): void => {

  let scrollHeigth;

  if(window.innerWidth < 350){
   scrollHeigth = 150;
  }else if(window.innerWidth < 500 && window.innerWidth > 350){
   scrollHeigth = 250;
  }else if(window.innerWidth < 700 && window.innerWidth > 500){
   scrollHeigth = 350;
  }else if(window.innerWidth < 1000 && window.innerWidth > 700){
   scrollHeigth = 500;
  }else{
    scrollHeigth = 650;
  }

   if(window.scrollY >= scrollHeigth){
     document.body.style.setProperty('--navbar-scroll', "rgb(2, 2, 99)");

     document.body.style.setProperty('--navbar-scroll-shadow', "0px 6px 12px -5px #000000");
   }else if(window.scrollY < scrollHeigth){
     document.body.style.setProperty('--navbar-scroll', "transparent");
     document.body.style.setProperty('--navbar-scroll-shadow', "none");
   }
 }
 HandleLogout()
 {
  this.authService.logout();
  window.location.reload();
 }
Navigate()
{
  this.router.navigateByUrl("/profile")
}
onSubmit(){
  const updatedData = {
    "nom": this.nom,
    "prenom": this.prenom,
    "tel": this.telephone,
    "email": this.email,
    "motDePasse": this.motDePasse,
    "faculte": this.Faculte,
    "cv": this.Cv,
    "adresse": this.adresse,
    "image": this.image
  };
  console.log(updatedData)
  this.stagiereServ.updateStagiere(this.authService.userId, updatedData).subscribe(
    res => {
    
    this.router.navigateByUrl("/profile")
      
    },
    error => {
      console.error(error);
    }
  );
}

onCVChange(event:any){
  // this.Cv = event.target.value;
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const reader = new FileReader();

    reader.onload = (eventt) => {
      this.Cv=eventt.target?.result ;
    
    };
   
    reader.readAsDataURL(selectedFile);
  }
}




}
