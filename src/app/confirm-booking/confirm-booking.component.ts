import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { BookingService } from './shared/booking.service';
import { BookingService } from '../shared/booking.service';
import { Bookingdetail } from '../booking/bookingdetail';
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ConfirmBooking } from '../confirm-booking/ConfirmBooking';
import { OperationalResult } from '../shared/OperationResult';
import { UserService } from '../shared/user.service';
import { IUser } from '../dashboard/User';

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {

  public result: Bookingdetail = {
    NoOfAvailableRoom: "",
    Roomprice: "",
    ToDate: "",
    FromDate: "",
    RoomType: "",
    AssetId: ""
  }

  availableRoomArray: number[] = [];
  roomNumber: number;
  public confirm: ConfirmBooking;
  discountPercentage: number;
  color: string;


  constructor(private router: Router, private _bookingdetails: BookingService, private userService: UserService) { }

  // confirmBooking(user:string,NoOfRoom:string,FromDate:string,ToDate:string,       ){
  //   swal("Booking Confirmed", "Thank You");

  //   this.router.navigate(["/booking"]);

  email: string = localStorage.getItem("email");
  loyaltyTier: number;
  discountAmount: number;
  newRoomPrice: number;
  user: IUser;
  optionValue: number = 0;
  roomPriceForSelected: number;

  ngOnInit() {
    this.result.NoOfAvailableRoom = JSON.parse(localStorage.getItem("NoOfAvailableRooms"));
    this.result.Roomprice = JSON.parse(localStorage.getItem("RoomPrice")); //1000
    this.result.ToDate = localStorage.getItem("todate");
    this.result.FromDate = localStorage.getItem("fromdate");
    this.result.RoomType = localStorage.getItem("RoomType");
    this.result.AssetId = localStorage.getItem("AssetId");
    // this.totalPrice=Number(this.result.Roomprice);
    this.setNumberOfRooms();

    this.userService.getUserforgotPassword(this.email).subscribe(
      data => {
        this.user = data.Result;
        this.loyaltyTier = this.user.LoyaltyTier;//2
        console.log(this.loyaltyTier);
        this.calculateDiscount();
      },
      (error: any) => {
        swal.close();
        this.router.navigate(["/error"]);
      }
    );

    //console.log(this.result);
    var datePipe = new DatePipe("en-US");
    this.result.ToDate = datePipe.transform(this.result.ToDate, 'MM/dd/yyyy');
    this.result.FromDate = datePipe.transform(this.result.FromDate, 'MM/dd/yyyy');
    this.bookingToDate = datePipe.transform(this.result.ToDate, 'dd-MMM-yyyy');
    this.bookingFromDate = datePipe.transform(this.result.FromDate, 'dd-MMM-yyyy');
  }
  bookingToDate;
  bookingFromDate;

  confirmBookingResult: OperationalResult = {
    Status: false,
    Message: "",
    Result: null,
    StatusCode: null
  };

  noOfRoomsSelected: string = "1";


  confirmBooking(): void {

    if (Number(this.noOfRoomsSelected) > 0 && Number(this.noOfRoomsSelected) <= Number(this.result.NoOfAvailableRoom)) {
      this.confirm = new ConfirmBooking();
      this.confirm.Asset_Id = this.result.AssetId;
      this.confirm.NoOfRooms = this.noOfRoomsSelected;
      this.confirm.BookingToDate = this.result.ToDate;
      this.confirm.BookingFromDate = this.result.FromDate;
      this.confirm.User_Id = this.user.UserId;
      this.confirm.User_Email = this.user.Email;
      this.confirm.Amount = this.roomPriceForSelected;//1000*2=2000
      this.confirm.DiscountAmount = this.discountAmount;//20% of 2000=400
      this._bookingdetails.confirmBooking(this.confirm).subscribe(
        data => {
          this.confirmBookingResult = data.valueOf();
          if (this.confirmBookingResult.Status) {
            swal("Booking Confirmed", "Thank You");
            this.router.navigate(["/booking"]);
          }
          else {
            swal("Booking Failed", "Sorry..Try Again");
          }
        },
        (error: any) => {
          swal.close();
          this.router.navigate(["/error"]);
        }
      );

    }
    else {
      swal("Select Valid Number Of Rooms.");
    }
  }

  setNumberOfRooms() {
    for (this.roomNumber = 1; this.roomNumber <= +this.result.NoOfAvailableRoom; this.roomNumber++) {
      this.availableRoomArray.push(this.roomNumber);
    }
  }

  calculateDiscount() {

    this.roomPriceForSelected = Number(this.result.Roomprice) * Number(this.noOfRoomsSelected);
    if (this.loyaltyTier == 1) {
      this.discountAmount = 0;
      this.discountPercentage = 0;

    }
    else if (this.loyaltyTier == 2) {
      this.discountAmount = (0.02) * this.roomPriceForSelected;
      this.discountPercentage = 2;

    }
    else if (this.loyaltyTier == 3) {
      this.discountAmount = (0.03) * this.roomPriceForSelected;
      this.discountPercentage = 3;

    }
    else if (this.loyaltyTier == 4) {
      this.discountAmount = (0.05) * this.roomPriceForSelected;
      this.discountPercentage = 5;

    }

    this.newRoomPrice = + this.roomPriceForSelected - this.discountAmount; //2000-400=1600

  }
}






