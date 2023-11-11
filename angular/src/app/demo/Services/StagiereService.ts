import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class StagiereService {

  private baseUrl : string='http://localhost:8080/api/stagieres'
  constructor(
    private http:HttpClient
  ) { }
  createProduct(stagiere:any)
  {
    const productUrl:string =`${this.baseUrl}`;
    return this.http.post(productUrl,stagiere)
  }
  getStagiere()
  {
    return this.http.get<Array<any>>(this.baseUrl)
  }
  deleteStagiere(id:any)
  {
    return this.http.delete(this.baseUrl+"/"+id)
  }
  getStagiereById(id:any)
  {
   
    return this.http.get<Array<any>>(this.baseUrl+"/"+id)
  }
  updateStagiere(id: number, updatedData: any){   
    // Make the PUT request
    return this.http.put("http://localhost:8080/api/stagieres/"+id, updatedData);
  }
  getStagiereByOffre(idOffre:any)
  {
    return this.http.get<Array<any>>("http://localhost:8080/api/stagieres/stagieresParOffres/"+idOffre)
  }
  addStagiere(stagiere:any)
  {

    return this.http.post("http://localhost:8080/api/stagieres/Registre",stagiere)
  }
}
