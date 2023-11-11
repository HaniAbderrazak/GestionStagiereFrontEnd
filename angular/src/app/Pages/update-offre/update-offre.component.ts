import { Location, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradientConfig } from 'src/app/app-config';
import { OffreService } from 'src/app/demo/Services/OffreService';

@Component({
  selector: 'app-update-offre',
  templateUrl: './update-offre.component.html',
  styleUrls: ['./update-offre.component.scss']
})
export class UpdateOffreComponent implements OnInit {
  navCollapsed: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;
  titre:string ='' ;
  description:string='';
  offres:Array<any>=[]
  offre:any =[];
  id:any;


  constructor(
    private offreService: OffreService,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private route: ActivatedRoute
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
  

// Split the URL by "/" to get individual parts
ngOnInit(): void {
  // Access the parameter from the URL
  this.route.paramMap.subscribe(params => {
    const numberValue = params.get('id');
    
    if (numberValue !== null) {
      const intValue = +numberValue;
      this.offreService.getOffreById(intValue).subscribe((res)=>{
        this.offre=res;
        this.titre=this.offre.titre;
        this.description=this.offre.description;
        this.id=intValue
        
      
      })
   
    } else {
      console.log('Parameter "id" not found in URL.');
    }
  });
  
}

 
  onSubmit() {
    const of={"titre":this.titre,"description":this.description}

    this.offreService.updateOffre(this.id,of).subscribe(res=>{
      
    })
   
    

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
  }

