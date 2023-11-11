import { Location, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GradientConfig } from 'src/app/app-config';
import { StagiereService } from 'src/app/demo/Services/StagiereService';

@Component({
  selector: 'app-update-stagiere',
  templateUrl: './update-stagiere.component.html',
  styleUrls: ['./update-stagiere.component.scss']
})
export class UpdateStagiereComponent implements OnInit {
  navCollapsed: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;


  nom:string ='' ;
  prenom:string='';
  telephone:number=0;
  email:string="";
  motDePasse:string=""
  Faculte:string="";
  Cv:any | undefined;
  image:any;
  adresse :string=""
  CvBytes:any;

  Users:Array<any>=[]
  Stagiere:any;
  id:any
  
  imagePreview: string | ArrayBuffer | null = null;
  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    private stagiereService:StagiereService ,
    private route: ActivatedRoute,
    private router:Router
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
    // Access the parameter from the URL
    this.route.paramMap.subscribe(params => {
      const numberValue = params.get('id');
      
      if (numberValue !== null) {
        const intValue = +numberValue;
        this.stagiereService.getStagiereById(intValue).subscribe((res)=>{
          this.Stagiere=res;
          this.nom=this.Stagiere.nom;
          this.prenom=this.Stagiere.prenom;
          this.telephone=this.Stagiere.tel;
          this.email=this.Stagiere.email;
          this.Faculte=this.Stagiere.faculte;
          this.Cv=this.Stagiere.Cv;
          this.image=this.Stagiere.image;
         
          this.adresse=this.Stagiere.adresse

          this.id=intValue
        
        })
     
      } else {
        console.log('Parameter "id" not found in URL.');
      }
    });
    
  }
  onSubmit() {
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
    this.stagiereService.updateStagiere(this.id, updatedData).subscribe(
      res => {
      
        this.router.navigateByUrl("admin/stagieres");
      },
      error => {
        console.error(error);
      }
    );
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