// Angular Import
import { Component, DoCheck } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { GradientConfig } from 'src/app/app-config';

// bootstrap
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthServiceService } from 'src/app/Services/auth-service.service';
import { Router } from '@angular/router';
import { StagiereService } from 'src/app/demo/Services/StagiereService';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig],
  animations: [
    trigger('slideInOutLeft', [
      transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(100%)' }))])
    ]),
    trigger('slideInOutRight', [
      transition(':enter', [style({ transform: 'translateX(-100%)' }), animate('300ms ease-in', style({ transform: 'translateX(0%)' }))]),
      transition(':leave', [animate('300ms ease-in', style({ transform: 'translateX(-100%)' }))])
    ])
  ]
})
export class NavRightComponent implements DoCheck {
  // public props
  visibleUserList: boolean;
  chatMessage: boolean;
  friendId!: number;
  gradientConfig = GradientConfig;
  username:any;
  userId:any;
  stagiere:any;

  // constructor
  constructor( private authService:AuthServiceService,
    private StagiereService:StagiereService,
    private router : Router
    ) {
      this.username=authService.username;
      this.StagiereService.getStagiereById(this.authService.userId).subscribe((elem)=>{
          this.stagiere=elem
      });
      
    this.visibleUserList = false;
    this.chatMessage = false;
  }

  // public method
  onChatToggle(friendID: number) {
    this.friendId = friendID;
    this.chatMessage = !this.chatMessage;
  }

  ngDoCheck() {
    if (document.querySelector('body')?.classList.contains('elite-rtl')) {
      this.gradientConfig.isRtlLayout = true;
    } else {
      this.gradientConfig.isRtlLayout = false;
    }
  }
  Navigate()
  {
    this.router.navigateByUrl("../profile")
  }
  handleLogout()
  {
    console.log("************")
    this.router.navigateByUrl("login");
    this.authService.logout();
  }
}
