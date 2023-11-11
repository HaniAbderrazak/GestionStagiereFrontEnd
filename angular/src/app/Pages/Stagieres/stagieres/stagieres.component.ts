import { Location, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GradientConfig } from 'src/app/app-config';
import { StagiereService } from 'src/app/demo/Services/StagiereService';

@Component({
  selector: 'app-stagieres',
  templateUrl: './stagieres.component.html',
  styleUrls: ['./stagieres.component.scss']
})

export class StagieresComponent {
  navCollapsed: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;
  stagieres:Array<any>=[];
   
  constructor(
    private stagiereService:StagiereService,
    private location: Location,
    private locationStrategy: LocationStrategy,
    private router: Router
  ) {
    let current_url = this.location.path();
    const baseHref = this.locationStrategy.getBaseHref();
    if (baseHref) {
      current_url = baseHref + this.location.path();
    }
    this.stagiereService.getStagiere().subscribe(res=>{
      console.log(res)
      res.forEach(element => {
        this.stagieres.push(element)
      });
    });
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
      }}


    }
    Navigate()
    {
      this.router.navigate(["admin/addStagiere"])
      //this.router.navigate(['updateoffre', offre.id]);
    }
    NavigateToUpdate(stage: number){
      this.router.navigate(["admin/updateStagiere",stage])
    }
    onDeleteClick(id: any) {
      this.stagiereService.deleteStagiere(id).subscribe(
        () => {
          location.reload();
        },
        (error) => {
          console.error('Error deleting offer:', error);
          // Handle error, display a notification, or perform other actions
        }
      );
    }
}

