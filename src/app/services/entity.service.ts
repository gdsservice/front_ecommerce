import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  // apiUrl: string = environment.apiUrl;

  // constructor(
  //   private http: HttpClient,
  // ) { }

  //  getData(entity: string):Observable<any> {
  //   return this.http.get(this.apiUrl+entity);
  // } 

  // searchData(entity: string, query: string): Observable<any>{
  //   return this.http.get(this.apiUrl+entity+"/search?"+query)
  // }


}
