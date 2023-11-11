// Angular Import
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// project import
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { OffresDeStagesComponent } from './Pages/offres-de-stages/offres-de-stages.component';
import { AddOffreComponent } from './Pages/add-offre/add-offre.component';
import { UpdateOffreComponent } from './Pages/update-offre/update-offre.component';
import { AddStagiereComponent } from './Pages/Stagieres/add-stagiere/add-stagiere.component';
import { UpdateStagiereComponent } from './Pages/Stagieres/update-stagiere/update-stagiere.component';
import { StagieresComponent } from './Pages/Stagieres/stagieres/stagieres.component';
import { OffreDetailsComponent } from './Pages/offre-details/offre-details.component';
import { StagiereDetailsComponent } from './Pages/Stagieres/stagiere-details/stagiere-details.component';
import { StagiereHomeComponent } from './Pages/template/stagiere-home/stagiere-home.component';
import SignInComponent from './demo/authentication/sign-in/sign-in.component';
import { AuthenticationGuard } from './Guards/authentication.guard';
import { authorizationGuard } from './Guards/authorization.guard';
import { UnothorizedComponent } from './Pages/unothorized/unothorized.component';
import SignUpComponent from './demo/authentication/sign-up/sign-up.component';
import { ProfileComponent } from './Pages/profile/profile.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';
import { OffreDetailsPourStagiereComponent } from './Pages/offre-details-pour-stagiere/offre-details-pour-stagiere.component';
import { ListStagiereAppliedComponent } from './Pages/list-stagiere-applied/list-stagiere-applied.component';
import { ListStagiereAcceptedComponent } from './Pages/list-stagiere-accepted/list-stagiere-accepted.component';



const routes: Routes = [
  {
    path: 'login',
    component: SignInComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,  canActivate: [AuthenticationGuard]
  },
  {
    path: 'editProfile',
    component: EditProfileComponent,canActivate: [AuthenticationGuard]
  },
  {
    path: 'offre/:id',
    component: OffreDetailsPourStagiereComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'ListStageApplied',
    component: ListStagiereAppliedComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'ListStageAccepted',
    component: ListStagiereAcceptedComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'offre/:id',
    component: OffreDetailsPourStagiereComponent, canActivate: [AuthenticationGuard]
  },
  {
    path: 'admin',
    canActivate: [AuthenticationGuard, authorizationGuard], 
    children: [
      {
        path: 'offres',
        component: OffresDeStagesComponent,
      },
      {
        path: 'addOffre',
        component: AddOffreComponent,
      },
      {
        path: 'updateoffre/:id',
        component: UpdateOffreComponent,
      },
      {
        path: 'addStagiere',
        component: AddStagiereComponent,
      },
      {
        path: 'updateStagiere/:id',
        component: UpdateStagiereComponent,
      },
      {
        path: 'stagieres',
        component: StagieresComponent,
      },
      {
        path: 'offreDetails/:id',
        component: OffreDetailsComponent,
      },
      {
        path: 'stagiereDetails/:id',
        component: StagiereDetailsComponent,
      },
      {
        path: '', // Redirect to 'offres' by default
        redirectTo: 'offres',
        pathMatch: 'full',
      },
    ],
  }
  ,
  {
    path: '', // Redirect to 'offres' by default
    redirectTo: 'Stagiere',
    pathMatch: 'full',
  },
  
  {
    path: 'Stagiere',
    component: StagiereHomeComponent,
  },
  {
    path: 'unauthorized',
    component: UnothorizedComponent,
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
