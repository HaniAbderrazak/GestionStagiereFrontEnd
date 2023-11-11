import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { DemandeService } from 'src/app/demo/Services/DemandeService';
import { OffreService } from 'src/app/demo/Services/OffreService';
import { StagiereService } from 'src/app/demo/Services/StagiereService';

@Component({
  selector: 'app-offre-details-pour-stagiere',
  templateUrl: './offre-details-pour-stagiere.component.html',
  styleUrls: ['./offre-details-pour-stagiere.component.scss']
})
export class OffreDetailsPourStagiereComponent implements OnInit {
  Offres:Array<any>=[]
  username:any;
  isAuthenticated:any
  error:any;
  alert:string="alert-warning"
  stagiere: any;
  offre:any;
  id:any;
  demande:any;
  isButtonClicked:boolean=false;
  isApplied:boolean=false
  isAccepted:boolean=false
 
  stagieres: any;
  demandeServ: any;
    constructor(
      private authService:AuthServiceService,
      private stagiereServ: StagiereService,
      private route: ActivatedRoute,
      private router:Router,
      private offreService:OffreService
      ,private DemandeServ:DemandeService
      ) {
          this.username=this.authService.username;
          this.stagiereServ.getStagiereById(this.authService.userId).subscribe(elem=>
            {
              this.stagiere=elem
            });
        }
      
   ngOnInit(): void {
    this.authService.loadJwtTokenFromLocalStorage();
    // Set the initial scroll position to the top of the page
    window.scrollTo(0, 0);
     this.route.paramMap.subscribe(params => {
    const numberValue = params.get('id');
    
    if (numberValue !== null) {
      const intValue = +numberValue;
      this.offreService.getOffreById(intValue).subscribe((res)=>{
        this.offre=res;
        this.stagiereServ.getStagiereByOffre(intValue).subscribe(elem=>
          this.stagieres=elem
        )
      })
      console.log("aaa")
      this.DemandeServ.getDemandeByOffreAndStagiere(intValue,this.authService.userId)
      .subscribe((elem)=>{ console.log("bbb")
      this.demande=elem
      if(elem!=null)
      {
        console.log(elem)
        this.isApplied=true
        this.isButtonClicked=true
        this.error="you already applied" 
        if(this.demande.etat==="accepter")
        {
            this.isAccepted=true
        }
      }
      
      },error=>
      {console.log("first error ")}
      
    ) 
   
    } else {
      console.log('Parameter "id" not found in URL.');
    }
  });

    console.log(this.demande)

  
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
  AddDemande(offreid: number) {
    if (!this.authService.isAuthenticated) {
      this.router.navigateByUrl("login");
    } 
    else 
    {
          
            const demandeData = {
              stagiere: { id: this.authService.userId },
              offreDeStage: { id: offreid }
            };
            if(!this.stagiere.cv||!this.stagiere.prenom||!this.stagiere.image)
            {
              this.router.navigateByUrl("editProfile");
            }else{
            this.DemandeServ.createProduct(demandeData).subscribe(
              (elem) => {
                this.alert="alert-success"
                this.error = "Application submitted successfully!";
                this.isButtonClicked=true;
                
              },
              (error) => {
                if(this.error.status===200)
                {
                  this.isButtonClicked=true;
                  this.error = "success";
                }
                else{
                  console.log("error  *** "+error)
                }
              }
            );}
           
        
    }
  
  }
  closeAlert() {
    this.isButtonClicked = false;
  }
  

  
  
  
  }
  