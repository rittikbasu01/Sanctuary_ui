import { Component, OnInit } from '@angular/core';
import { BookingService } from '../shared/booking.service';
import { Router } from '@angular/router';
import { OperationalResult } from '../shared/OperationResult';
import swal from 'sweetalert2';
import { AdminassetService } from '../shared/adminasset.service';

@Component({
  selector: 'app-show-assets',
  templateUrl: './show-assets.component.html',
  styleUrls: ['./show-assets.component.css']
})
export class ShowAssetsComponent implements OnInit {

  displayedColumns = ['City', 'Country'];

  constructor(private adminAsset: AdminassetService, private router: Router) {
  }
  operationResult:OperationalResult;
  dataSource:any;
  dataSource2:any;

  ngOnInit() {
    swal({
      title: "Loading booking...",
      text: "please wait..!",
      showConfirmButton: false
    });
    swal.showLoading();
    this.adminAsset.allAssets().subscribe((data:any) => {
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


  view_booking(row) {
    this.dataSource2 = row;
    console.log(this.dataSource2);
  }

}
