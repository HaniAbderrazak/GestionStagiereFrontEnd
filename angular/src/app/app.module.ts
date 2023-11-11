// Angular Import
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// project import
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { ChatMsgComponent } from './theme/layout/admin/nav-bar/nav-right/chat-msg/chat-msg.component';
import { ChatUserListComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/chat-user-list.component';
import { FriendComponent } from './theme/layout/admin/nav-bar/nav-right/chat-user-list/friend/friend.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { OffresDeStagesComponent } from './Pages/offres-de-stages/offres-de-stages.component';
import { AddOffreComponent } from './Pages/add-offre/add-offre.component';
import { UpdateOffreComponent } from './Pages/update-offre/update-offre.component';
import { AddStagiereComponent } from './Pages/Stagieres/add-stagiere/add-stagiere.component';
import { UpdateStagiereComponent } from './Pages/Stagieres/update-stagiere/update-stagiere.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OffreDeStageComponent } from './Pages/offre-de-stage/offre-de-stage.component';
import { StagieresComponent } from './Pages/Stagieres/stagieres/stagieres.component';
import { OffreDetailsComponent } from './Pages/offre-details/offre-details.component';
import { StagiereDetailsComponent } from './Pages/Stagieres/stagiere-details/stagiere-details.component';
import { StagiereHomeComponent } from './Pages/template/stagiere-home/stagiere-home.component';
import { AppHttpInterceptor } from './interceptor/app-http.interceptor';
import { UnothorizedComponent } from './Pages/unothorized/unothorized.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';
import { OffreDetailsPourStagiereComponent } from './Pages/offre-details-pour-stagiere/offre-details-pour-stagiere.component';
import { ListStagiereAppliedComponent } from './Pages/list-stagiere-applied/list-stagiere-applied.component';
import { ListStagiereAcceptedComponent } from './Pages/list-stagiere-accepted/list-stagiere-accepted.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    GuestComponent,
    ConfigurationComponent,
    NavBarComponent,
    NavigationComponent,
    NavLeftComponent,
    NavRightComponent,
    NavSearchComponent,
    ChatMsgComponent,
    ChatUserListComponent,
    FriendComponent,
    NavContentComponent,
    NavItemComponent,
    NavCollapseComponent,
    NavGroupComponent,
    OffresDeStagesComponent,
    AddOffreComponent,
    UpdateOffreComponent,
    AddStagiereComponent,
    UpdateStagiereComponent,
    OffreDeStageComponent,
    StagieresComponent,
    OffreDetailsComponent,
    StagiereDetailsComponent,
    StagiereHomeComponent,
    UnothorizedComponent,
    ProfileComponent,
    EditProfileComponent,
    OffreDetailsPourStagiereComponent,
    ListStagiereAppliedComponent,
    ListStagiereAcceptedComponent,
  
    
   
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule,  HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,useClass: AppHttpInterceptor,multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
