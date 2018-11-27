
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { OperationalResult } from './OperationResult';
import { Assets } from '../admin-asset-setting/asset';
import { DeleteAssets } from '../admin-asset-setting/deleteAssest';



@Injectable()
export class AdminassetService {
  private assetsAPI: string = "http://localhost:61938/Assets";
  //private assetsAPI : string = "https://sanctuaryuibackdotnet.azurewebsites.net/Assets";
  

  constructor(private http: HttpClient) { }

  //For Update Assets
  setAsset(asset: Assets): Observable<OperationalResult> {

    let body = asset;
    return this.http.put<OperationalResult>(this.assetsAPI + "/Update", body).catch(this.handleError);

  }

  allAssets(): Observable<OperationalResult> {
    return this.http.get<OperationalResult>(this.assetsAPI + "/getAllAssets").catch(this.handleError);
  }

  //getting location City Name And Location Id 
  getLocationNamesAssets(countryName: string): Observable<OperationalResult> {

    return this.http.get<OperationalResult>(this.assetsAPI + "/LocationForAssets", { params: { countryName: countryName } }).catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
