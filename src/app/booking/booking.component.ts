import { Component, OnInit } from '@angular/core';
import { Ibooking } from '../booking/booking';
import { BookingService } from '../shared/booking.service';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { OperationalResult } from '../shared/OperationResult';
import { Availableroomdetails } from './availableroomdetails';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Bookingdetail } from './bookingdetail';
import { Router } from '@angular/router';
import { debug } from 'util';
import swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  ngAfterViewInit() {
    swal.close();
  }

  available: Availableroomdetails =
    {
      AssetId: null,
      RoomType: '',
      Availableroom: ''
    }
  private book: Ibooking;

  isSearchButtonClicked: boolean;

  onChange(){
   this.minToDate=this.bookingForm.get('fromdate').value;
   
  }
  minDate: Date;
  maxDate: Date;
  minToDate: Date;
  ngOnInit() {
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minToDate=new Date();
    this.maxDate.setDate(this.minDate.getDate() + 60);
    this.isSearchButtonClicked = false;
    this.getlocationCityNames();

  }


  result: OperationalResult = {
    Status: false,
    Message: "",
    Result: this.available,
    StatusCode: null

  };

  australiaLocationDetails: OperationalResult = {
    Status: false,
    Message: "",
    Result: null,
    StatusCode: null

  };
  newZealandLocationDetails: OperationalResult = {
    Status: false,
    Message: "",
    Result: null,
    StatusCode: null

  };

  AustralialocationCityNames: any;
  NewZealandlocationCityNames: any;

  constructor(private _bookingService: BookingService, private router: Router) {
    // this.minDate = new Date();
    // this.maxDate = new Date();
    // this.maxDate.setDate(this.minDate.getDate() + 60);
  }

  bookingForm = new FormGroup({
    todate: new FormControl('', Validators.required),
    fromdate: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required)
  }, this.bookingDateValidator);

  bookingDateValidator(bookingForm: FormGroup) {
    let todate = bookingForm.get('todate').value;
    let fromdate = bookingForm.get('fromdate').value;
    bookingForm.get('todate').setErrors(null);
    if (todate >= fromdate) {
      bookingForm.get('todate').setErrors(null);
      return null;
    }
    bookingForm.get('todate').setErrors({'notValid':true});
    

  }



  private bookingResult: Bookingdetail;

  setbookingDetails(NoOfAvailableRooms: string, RoomPrice: string, todate: string, fromdate: string, roomtype: string, AssetId: string): void {
    localStorage.setItem("NoOfAvailableRooms", NoOfAvailableRooms);
    localStorage.setItem("RoomPrice", RoomPrice);
    localStorage.setItem("todate", todate);
    localStorage.setItem("fromdate", fromdate);
    localStorage.setItem("RoomType", roomtype);
    localStorage.setItem("AssetId", AssetId);
    this.router.navigate(["/bookingdetail"]);
  }

  searchLoading: boolean = false;
  searchBooking(bookingForm): void {
    this.searchLoading = true;
    let SearchFromDate = bookingForm.value.fromdate;
    let SearchToDate = bookingForm.value.todate;
    let SearchLocation = bookingForm.value.location;
    console.log(SearchFromDate);
    console.log(SearchToDate);

    var datePipe = new DatePipe("en-US");
    SearchToDate = datePipe.transform(SearchToDate, 'MM/dd/yyyy');
    SearchFromDate = datePipe.transform(SearchFromDate, 'MM/dd/yyyy');

    this._bookingService.searchBooking(SearchFromDate, SearchToDate, SearchLocation).subscribe(
      (data: any) => {

        this.result = data.valueOf();

        if (this.result.Status == true) {
          this.searchLoading = false;
          this.isSearchButtonClicked = true;
        }
      },
      (error: any) => {
        swal.close();
        this.router.navigate(["/error"]);
      }
    );



  }

  getlocationCityNames(): void {

    this._bookingService.getLocationCityNames("New Zealand").subscribe(
      (data:any) =>{
        this.newZealandLocationDetails=data.valueOf();
        this.NewZealandlocationCityNames=this.newZealandLocationDetails.Result;
        
      },
      (error: any) => {
        swal.close();
        this.router.navigate(["/error"]);
      }
    );

    this._bookingService.getLocationCityNames("Australia").subscribe(
      (data:any)=>{
        this.australiaLocationDetails=data.valueOf();
        this.AustralialocationCityNames=this.australiaLocationDetails.Result;
        
      },
      (error: any) => {
        swal.close();
        this.router.navigate(["/error"]);
      }
    );

  }

}
