import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/booking.service';
import { DatePipe } from '@angular/common';
import { OperationalResult } from '../shared/OperationResult';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'previous-bookings',
  templateUrl: './previous-bookings.component.html',
  styleUrls: ['./previous-bookings.component.css']
})
export class PreviousBookingsComponent implements OnInit {



  displayedColumns = ['BookingFromDate', 'BookingToDate', 'NoOfRooms', 'LocationCity'];
  operationResult: any;
  dataSource: any;
  datasource2: any;
  tempDate: any;
  cancelBookingResult: OperationalResult = {
    Status: false,
    Message: "",
    Result: null,
    StatusCode: null
  };
  constructor(private _bookingdetails: BookingService, private router: Router) {
  }

  ngOnInit() {
    swal({
      title: "Loading booking...",
      text: "please wait..!",
      showConfirmButton: false
    });
    swal.showLoading();
    this._bookingdetails.myBookings(localStorage.getItem('email').toString()).subscribe(data => {
      this.operationResult = data.valueOf();
      console.log(this.operationResult);
      this.dataSource = this.operationResult.Result;
      swal.close();
      console.log(this.dataSource);

    },
      (error: any) => {
        swal.close();
        this.router.navigate(["/error"]);
      }
    );
  }

  public AmountPaid: number = 0;



  view_booking(row) {
    this.datasource2 = row;
    this.AmountPaid = (this.datasource2.Amount) - (this.datasource2.DiscountAmount);
    var datePipe = new DatePipe("en-US");
    this.datasource2.BookingFromDate = datePipe.transform(this.datasource2.BookingFromDate, 'dd-MMM-yyyy');
    this.datasource2.BookingToDate = datePipe.transform(this.datasource2.BookingToDate, 'dd-MMM-yyyy');
    if (this.datasource2.IsDelete == true) {
      this.datasource2.status = -1;
    }
    else {
      this.tempDate = datePipe.transform(Date.now(), 'dd-MMM-yyyy');
      if (new Date(this.tempDate) > new Date(this.datasource2.BookingFromDate)) {
        this.datasource2.status = 1;
      }
      else {
        this.datasource2.status = 0;
      }
    }
  }

  cancel_booking(row) {
    swal({
      title: "Cancelling booking...",
      text: "please wait..!",
      showConfirmButton: false
    });
    swal.showLoading();
    this._bookingdetails.cancelBooking(row.BookingId).subscribe(
      data => {
        this.cancelBookingResult = data.valueOf();
        if (this.cancelBookingResult.Status) {
          swal({
            title: "Booking Cancelled Successfully",
            text: "The booking amount has been refunded",
            timer: 4000,
            showConfirmButton: false
          });
          window.location.reload();
        }
        else {
          swal({
            title: "Booking Cancellation Failed",
            text: "Please try again...",
            timer: 4000,
            showConfirmButton: false
          });
        }
      },
      (error: any) => {
        swal.close();
        this.router.navigate(["/error"]);
      }
    );
  }
}