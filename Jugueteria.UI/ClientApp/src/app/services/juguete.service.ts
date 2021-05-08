import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JugueteService {

  private myAppUrl = 'https://localhost:44371/';
  private myApiUrl = 'api/juguete/';

  constructor(private http: HttpClient) { }

  getListJuguetes(): Observable<any>{
    return this.http.get(this.myAppUrl + this.myApiUrl);
  }

  deleteJuguete(id: number): Observable<any>{
    return this.http.delete(this.myAppUrl + this.myApiUrl + id)
  }

  saveJuguete(juguete: any){
    return this.http.post(this.myAppUrl + this.myApiUrl, juguete);
  }

  updateJuguete(id: number, juguete: any): Observable<any>{
    return this.http.put(this.myAppUrl + this.myApiUrl + id, juguete);
  }
}
