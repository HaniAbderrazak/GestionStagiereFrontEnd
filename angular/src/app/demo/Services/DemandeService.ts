import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DemandeService {

  private baseUrl : string='http://localhost:8080/api/demandes'
  constructor(
    private http:HttpClient
  ) { }
  createProduct(demande:any)
  {
    const productUrl:string =`${this.baseUrl}/`;
    return this.http.post(productUrl,demande)
  }
  getDemandes()
  {
   
    return this.http.get<Array<any>>(this.baseUrl)
  }
  deleteDemandes(id:any)
  {
    return this.http.delete(this.baseUrl+"/"+id)
  }
  getDemandesById(id:any)
  {
   
    return this.http.get<Array<any>>(this.baseUrl+"/"+id)
  }
  updateDemandes(id: number, updatedData: any){
   
    
    // Make the PUT request
    return this.http.put(this.baseUrl+"/"+id, updatedData);
  }
  accepterStagiere(idOffre: number, idStagiere: number) {
    const url = `http://localhost:8080/api/demandes/acceptStagiere/${idOffre}/${idStagiere}`;
    return this.http.put(url, null);
  }
  getDemandeByOffreAndStagiere(idOffre: number, idStagiere: number) {
    const url = `http://localhost:8080/api/demandes/Demande/${idOffre}/${idStagiere}`;
    return this.http.get<Array<any>>(url);
  }
  getAcceptedStagiereByOffre(offreId:number)
  {
    const url = `http://localhost:8080/api/demandes/accepted/${offreId}`;
    return this.http.get<Array<any>>(url);
  }
  getOffreApplied(stagiereId:number)
  {
    const url = `http://localhost:8080/api/demandes/stagebystagiere/${stagiereId}`;
    return this.http.get<Array<any>>(url);
  }
  getOffreAppliedAndAccepted(stagiereId:number)
  {
    const url = `http://localhost:8080/api/demandes/stageAccepted/${stagiereId}`;
    return this.http.get<Array<any>>(url);
  }
}
