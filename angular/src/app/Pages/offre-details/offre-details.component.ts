import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { GradientConfig } from 'src/app/app-config';
import { OffreService } from 'src/app/demo/Services/OffreService';
import { ActivatedRoute, Router } from '@angular/router';
import { StagiereService } from 'src/app/demo/Services/StagiereService';
import { DemandeService } from 'src/app/demo/Services/DemandeService';
@Component({
  selector: 'app-offre-details',
  templateUrl: './offre-details.component.html',
  styleUrls: ['./offre-details.component.scss']
})


export class OffreDetailsComponent implements OnInit {
  
  navCollapsed: boolean;
navCollapsedMob: boolean;
windowWidth: number;
offre: any;
demande:any;
stagieres:Array<any>=[]
stagieresAccpeted:Array<any>=[]
acceptanceSuccess: boolean = false;
  constructor(
    private router: Router,
    private OffresService:OffreService,
    private stagiereService:StagiereService,
    private demandeService : DemandeService,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private route: ActivatedRoute,
   
  ) {
   
    
      
    

 
  
  
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
  
    this.windowWidth = window.innerWidth;
  
    if (current_url === baseHref + '/layout/collapse-menu' || (this.windowWidth >= 992 && this.windowWidth <= 1024)) {
      GradientConfig.collapse_menu = true;
    }
  
    this.navCollapsed = this.windowWidth >= 992 ? GradientConfig.collapse_menu : false;
    this.navCollapsedMob = false;


   
   
    
    
    
    
    
    
  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const numberValue = params.get('id');
  
      if (numberValue !== null) {
        const intValue = +numberValue;
        this.OffresService.getOffreById(intValue).subscribe((res) => {
          this.offre = res;
        });
        this.stagiereService.getStagiereByOffre(intValue).subscribe((res) => {
          this.stagieres = res;
        });
        this.demandeService.getAcceptedStagiereByOffre(intValue).subscribe((res) => {
          this.stagieresAccpeted = res;
  
          this.stagieres.forEach(stagiere => {
            if (this.stagieresAccpeted.some(acceptedStagiere => acceptedStagiere.id === stagiere.id)) {
              console.log("Stagiere accepted:", stagiere.id);
            } else {
              console.log("Stagiere not accepted:", stagiere.id);
            }
          });
        });
      }
    });
  }
  
  


  navMobClick() {
    if (this.windowWidth < 992) {
      if (this.navCollapsedMob && !document.querySelector('app-navigation.pcoded-navbar')?.classList.contains('mob-open')) {
        this.navCollapsedMob = !this.navCollapsedMob;
        setTimeout(() => {
          this.navCollapsedMob = !this.navCollapsedMob;
        }, 100);
      } else {
        this.navCollapsedMob = !this.navCollapsedMob;
      }
    }
  }
  onAcceptClick(idOffre:number, idStagiere:number) {
    console.log("*******************************")
    this.demandeService.accepterStagiere(this.offre.id, idStagiere).subscribe(
      response => {
        // Handle the successful response here
        console.log("Acceptance successful:", response);
        this.acceptanceSuccess = true; // Set the flag to display the success message
        setTimeout(() => {
          this.acceptanceSuccess = false; // Hide the success message after a delay
        }, 5000); // Adjust the delay as needed
        location.reload();// Reload the current page
      },
      error => {
        // Handle the error here
        console.error("Acceptance error:", error);
      }
    )
  }
  
  onRefuseClick(stage:number){
    this.demandeService.getDemandeByOffreAndStagiere(this.offre.id,stage).subscribe(res=>{
      this.demande=res;
      console.log("*********")
      console.log(this.demande.id)
      this.demandeService.deleteDemandes(this.demande.id).subscribe(   () => {
        location.reload();
      },
      (error) => {
        console.error('Error deleting offer:', error);
        // Handle error, display a notification, or perform other actions
      })
   })
    
    
  }
  isStagiereAccepted(stagiere: any): boolean {
    return this.stagieresAccpeted.some(acceptedStagiere => acceptedStagiere.id === stagiere.id);
  }
  InfoCLick(stage:any)
  {
    this.router.navigate(['admin/stagiereDetails', stage.id]);
  }
}
