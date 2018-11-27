import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable } from 'rxjs/Observable';
import { ILocation } from "../admin-location-setting/location";
import { OperationalResult } from "./OperationResult";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class AdminLocationServiceService {

  constructor(private http: HttpClient) { }

  private locationAPI: string = "http://localhost:61938/api/Location";
  //private locationAPI : string = "https://sanctuaryuibackdotnet.azurewebsites.net/api/Location";

  addLocation(location: ILocation): Observable<any> {

    let body = location;
    //console.log("inside service file");
    return this.http.post(this.locationAPI + "/AddLocation", body).catch(this.handleError);
  }

  getLocations(): Observable<OperationalResult> {
    return this.http.get<OperationalResult>(this.locationAPI + "/GetLocations").catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }

}
