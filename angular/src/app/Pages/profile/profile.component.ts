import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { DemandeService } from 'src/app/demo/Services/DemandeService';
import { StagiereService } from 'src/app/demo/Services/StagiereService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl:'./profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
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
role:any
 demande:any=null;
  constructor(
    private authService:AuthServiceService,
    private stagiereServ: StagiereService,
    private sanitizer: DomSanitizer,

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
            console.log(this.role)
          console.log()
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

}


navigate()
{
  this.router.navigateByUrl("/editProfile")
}
createBlobUrl(base64Data: string): SafeResourceUrl {
  const base64Content = base64Data.split(",")[1];
  const binaryData = atob(base64Content);
  const arrayBuffer = new ArrayBuffer(binaryData.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([uint8Array], { type: 'application/pdf' });
  const blobUrl = URL.createObjectURL(blob);
  return this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl);
}

// Other component code









}
