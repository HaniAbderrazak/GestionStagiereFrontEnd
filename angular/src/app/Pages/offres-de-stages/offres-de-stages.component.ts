import { Component } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { GradientConfig } from 'src/app/app-config';
import { OffreService } from 'src/app/demo/Services/OffreService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offres-de-stages',
  templateUrl: './offres-de-stages.component.html',
  styleUrls: ['./offres-de-stages.component.scss']
})
export class OffresDeStagesComponent {

navCollapsed: boolean;
navCollapsedMob: boolean;
windowWidth: number;
offres: Array<any>=[] ;

constructor(
  private OffresService:OffreService,
  private location: Location,
  private locationStrategy: LocationStrategy,
  private router: Router
) {
  OffresService.getOffres().subscribe((res)=>{
    res.forEach(element => {
      this.offres.push(element)
      
    });
  })

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
Navigate()
{
  this.router.navigate(["admin/addOffre"])
  //this.router.navigate(['updateoffre', offre.id]);
}
}
