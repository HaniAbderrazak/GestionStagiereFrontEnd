import { Location, LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { GradientConfig } from 'src/app/app-config';
import { StagiereService } from 'src/app/demo/Services/StagiereService';

@Component({
  selector: 'app-add-stagiere',
  templateUrl: './add-stagiere.component.html',
  styleUrls: ['./add-stagiere.component.scss']
})
export class AddStagiereComponent {
  navCollapsed: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;


  nom:string ='' ;
  prenom:string='';
  telephone:number=0;
  email:string="";
  motDePasse:string=""
  Faculte:string="";
  Cv:File | undefined;
  image:string="";
  adresse :string=""


  
  stagieres:Array<any>=[]
  Users:Array<any>=[]
  
  constructor(
    private location: Location,
    private stagiereService:StagiereService,
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
    
    // this.Users.push({'nom':this.nom ,'prenom':this.prenom,'telephone':this.telephone,'email':this.email});
    // console.log(this.Users)
    const stagiere={"nom":this.nom,"prenom":this.prenom,"tel":this.telephone,"email":this.email,
    "motDePasse":this.motDePasse,"faculte":this.Faculte,"cv":this.Cv,"image":this.image,"adresse":this.adresse}
    
    console.log(stagiere)
  this.stagiereService.createProduct(stagiere).subscribe((res)=>{
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

