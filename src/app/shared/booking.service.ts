import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/catch'
import { HttpErrorResponse } from '@angular/common/http/src/response';
import { Ibooking } from '../booking/booking';
import { Availableroomdetails } from '../booking/availableroomdetails';
import { OperationalResult } from '../shared/OperationResult';
import { debug } from 'util';
import { ConfirmBooking } from '../confirm-booking/ConfirmBooking';

@Injectable()
export class BookingService {
  private bookingAPI: string = "http://localhost:61938/Booking";
  private locationAPI: string = "http://localhost:61938/api/Location"
 // private bookingAPI : string="https://sanctuaryuibackdotnet.azurewebsites.net/Booking";
  //private locationAPI : string = "https://sanctuaryuibackdotnet.azurewebsites.net/api/Location";
 
  constructor(private http: HttpClient) { }
  
  roomDetails: Availableroomdetails = {
    AssetId: "",
    RoomType: "",
    Availableroom: ""
  };


  result: OperationalResult = {
    Status: true,
    Message: "",
    Result: this.roomDetails,
    StatusCode: null

  };


  searchBooking(fromdate: string, todate: string, location: string): Observable<any> {
    // console.log(todate.toString()+"i am here");

    return this.http.get(this.bookingAPI + "/CheckAvailability", { params: { bookingFromDate: fromdate, bookingToDate: todate, locationCity: location } }).catch(this.handleError);
    // return of(this.result);
  }




  confirmBooking(confirm): Observable<any> {

    return this.http.post(this.bookingAPI + "/CreateBooking", confirm).catch(this.handleError);
  }

  getLocationCityNames(locationCountryName: string): Observable<any> {
    return this.http.get(this.locationAPI + "/GetLocationCityNames", { params: { locationCountryName: locationCountryName } }).catch(this.handleError);
  }

  myBookings(email: string): Observable<any> {
    return this.http.get(this.bookingAPI + "/myBookings", { params: { email: email } }).catch(this.handleError);
  }

  cancelBooking(bookingId: any): Observable<any> {
    return this.http.delete(this.bookingAPI + "/cancel", { params: { bookingId: bookingId } }).catch(this.handleError);
  }

  
  allBookings() : Observable<any>
  {
    return this.http.get(this.bookingAPI + "/all").catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
  }
}
