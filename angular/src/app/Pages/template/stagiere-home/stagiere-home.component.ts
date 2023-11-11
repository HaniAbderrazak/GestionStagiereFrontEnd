import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { DemandeService } from 'src/app/demo/Services/DemandeService';
import { OffreService } from 'src/app/demo/Services/OffreService';
import { StagiereService } from 'src/app/demo/Services/StagiereService';

@Component({
  selector: 'app-stagiere-home',
  templateUrl: './stagiere-home.component.html',
  styleUrls: ['./stagiere-home.component.scss']
})
export class StagiereHomeComponent implements OnInit {
Offres:Array<any>=[]
username:any;
isAuthenticated:any
error:any;
isButtonClicked: boolean[] = [];
alert:string="alert-warning"
activeAlertIndex: number = -1;
stagiere:any;
role:any="";

 demande:any=null;
  constructor(private OffresService:OffreService
    ,private authService:AuthServiceService,
    private demandeServ: DemandeService,
    private stagiereService:StagiereService,

    private router:Router
    ) {
        this.username=this.authService.username;
        this.isAuthenticated=this.authService.isAuthenticated;
        if(this.isAuthenticated){
        this.role=this.authService.roles.includes("ROLE_ADMIN")
        }
      }

 ngOnInit(): void {
  this.OffresService.getOffreForStagiere().subscribe(res=>{
    res.forEach(element => {
      this.Offres=res;
    });
    this.authService.loadJwtTokenFromLocalStorage();
  })
   window.addEventListener('scroll', this.scroll, true)
   this.stagiereService.getStagiereById(this.authService.userId).subscribe(elem=>
    {
      this.stagiere=elem}); 
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
AddDemande(offreid: number, index: number) {
  if (!this.authService.isAuthenticated) {
    this.router.navigateByUrl("login");
  } else {

    if (this.activeAlertIndex !== -1) {
      this.isButtonClicked[this.activeAlertIndex] = false;
    }
    this.activeAlertIndex = index;
    this.demandeServ.getDemandeByOffreAndStagiere(offreid, this.authService.userId).subscribe(
      (existingDemande) => {
        this.demande = existingDemande;
        this.error = "You already applied for this stage! Please wait for our answer.";
        this.isButtonClicked[index] = true;

      },
    )
          const demandeData = {
            stagiere: { id: this.authService.userId },
            offreDeStage: { id: offreid }
          };
          this.demandeServ.createProduct(demandeData).subscribe(
            () => {
              this.alert="alert-success"
              this.error = "Application submitted successfully!";
              this.isButtonClicked[index] = true;
            },
            (createError) => {
              if(this.error.status===200)
              {
                this.error = "success";
                this.isButtonClicked[index] = true;
              }
            }
          );
        
      
    
  }

}
closeAlert(index: number) {
  this.isButtonClicked[index] = false;
}


}
