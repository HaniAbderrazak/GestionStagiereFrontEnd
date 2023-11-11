import { Location, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { GradientConfig } from 'src/app/app-config';
import { OffreService } from 'src/app/demo/Services/OffreService';

@Component({
  selector: 'app-add-offre',
  templateUrl: './add-offre.component.html',
  styleUrls: ['./add-offre.component.scss']
})
export class AddOffreComponent {
  navCollapsed: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;
  titre:string ='' ;
  description:string='';
  offres:Array<any>=[]
  offre:any=[];
  constructor(
    private offreS:OffreService,
    private location: Location,
    private locationStrategy: LocationStrategy
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
  onSubmit() {
    const offre={"titre":this.titre,"description":this.description}
    console.log(offre)
  this.offreS.createProduct(offre).subscribe((res)=>{
    alert("project added")});

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

