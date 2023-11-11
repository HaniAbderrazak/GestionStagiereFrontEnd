import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class OffreService {

  private baseUrl : string='http://localhost:8080/api/offres'
  constructor(
    private http:HttpClient
  ) { }
  createProduct(offre:any)
  {
    const productUrl:string =`${this.baseUrl}`;
    return this.http.post(productUrl,offre)
  }
  getOffres()
  {
   
    return this.http.get<Array<any>>(this.baseUrl)
  }
  getOffreForStagiere()
  {
    return this.http.get<Array<any>>("http://localhost:8080/api/stagieres/offresPourStagiere");
  }
  deleteOffre(id:any)
  {
    return this.http.delete(this.baseUrl+"/"+id)
  }
  getOffreById(id:any)
  {
   
    return this.http.get<Array<any>>(this.baseUrl+"/"+id)
  }
  updateOffre(id: number, updatedData: any){
   
    
    // Make the PUT request
    return this.http.put(this.baseUrl+"/"+id, updatedData);
  }
}
