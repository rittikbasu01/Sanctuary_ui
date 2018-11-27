import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Assets } from './asset';
import { AdminassetService } from '../shared/adminasset.service';
import { OperationalResult } from '../shared/OperationResult';
import { Console } from '@angular/core/src/console';
import { DeleteAssets } from './deleteAssest';
import swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-asset-setting',
  templateUrl: './admin-asset-setting.component.html',
  styleUrls: ['./admin-asset-setting.component.css']
})
export class AdminAssetSettingComponent implements OnInit {
  

  public assetsofexportclass: Assets;
  public deleteassest: Assets;
  constructor(private asset: AdminassetService,private _router:Router) { }

  ngOnInit() {

    this.getLocationNameAssets();
  }
  result: OperationalResult = {
    Status: false,
    Message: "",
    Result: "",
    StatusCode: null

  };
  newZealandLocationDetails: OperationalResult = {
    Status: false,
    Message: "",
    Result: "",
    StatusCode: null
  };
  australiaLocationDetails: OperationalResult = {
    Status: false,
    Message: "",
    Result: "",
    StatusCode: null
  };

  NewZealandlocationCityNames: any;
  AustralialocationCityNames: any;

  addAssetForm = new FormGroup({
    roomtype: new FormControl('', Validators.required),
    noofrooms: new FormControl('', [Validators.required, Validators.pattern('^[1-9]?[0-9]{1}$|^100$')]),
    roomprice: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+(\.[0-9]{1,2})?$'), , Validators.maxLength(8)]),
    locationid: new FormControl('', [Validators.required])
  });

  setAsset(addAssetForm) {
    swal({
      title: "Updating Assets",
      text: "Please wait",
      showConfirmButton: false,
    });
    swal.showLoading();
    this.assetsofexportclass = new Assets();
    this.assetsofexportclass.RoomType = addAssetForm.value.roomtype;
    this.assetsofexportclass.NoOfRooms = addAssetForm.value.noofrooms;
    this.assetsofexportclass.RoomPrice = addAssetForm.value.roomprice;
    this.assetsofexportclass.LocationId = addAssetForm.value.locationid;
    this.asset.setAsset(this.assetsofexportclass).subscribe(
      (data: any) => {
        this.result = data.valueOf();
        //console.log(this.result.Status);
        if(this.result.Status)
        {
          swal({
              title:"Assets Updated..",
              text:"Rooms Updates are done..",
              showConfirmButton: false,
          });
          // this.router.navigate(["/admin"]);
          
        }
        else{
          swal.close();
        }

      },
      (error: any) => {
        swal.close();
        this._router.navigate(["/error"]);
      }
    );
  }


  getLocationNameAssets(): void {


    this.asset.getLocationNamesAssets("Australia").subscribe(
      (data: any) => {
        this.australiaLocationDetails = data.valueOf();
        this.AustralialocationCityNames = this.australiaLocationDetails.Result;
      },
      (error: any) => {
        swal.close();
        this._router.navigate(["/error"]);
      }
    );

    this.asset.getLocationNamesAssets("New Zealand").subscribe(
      (data: any) => {
        this.newZealandLocationDetails = data.valueOf();
        this.NewZealandlocationCityNames = this.newZealandLocationDetails.Result;
      },
      (error: any) => {
        swal.close();
        this._router.navigate(["/error"]);
      }
    );


  }
}
