import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy } from '@angular/common';
import { GradientConfig } from 'src/app/app-config';
import { ActivatedRoute, Router } from '@angular/router';
import { StagiereService } from 'src/app/demo/Services/StagiereService';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-stagiere-details',
  templateUrl: './stagiere-details.component.html',
  styleUrls: ['./stagiere-details.component.scss']
})
export class StagiereDetailsComponent implements OnInit {

  navCollapsed: boolean;
  navCollapsedMob: boolean;
  windowWidth: number;
  stagiere:any;
 

  constructor(
    private location: Location,
    private locationStrategy: LocationStrategy,
    private router: Router,
    private stagiereServ:StagiereService ,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,

  ){

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
        this.stagiereServ.getStagiereById(intValue).subscribe((res) => {
          this.stagiere = res;
        });
  }})
 
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
sendEmail() {
  const subject = 'Regarding your internship application';
  const body = 'Dear Stagiere,\n\nWe are pleased to inform you...'; // Your email body content
  const mailtoLink = `mailto:${this.stagiere.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  window.location.href = mailtoLink;
}
NavigateToUpdate(stage: number){
  this.router.navigate(["admin/updateStagiere",stage])
}
onDeleteClick(id: any) {
  this.stagiereServ.deleteStagiere(id).subscribe(
    () => {
      location.reload();
    },
    (error) => {
      console.error('Error deleting offer:', error);
      // Handle error, display a notification, or perform other actions
    }
  );
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

}
