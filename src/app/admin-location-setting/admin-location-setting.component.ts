import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ILocation } from "./location";
import { AdminLocationServiceService } from "../shared/admin-location-service.service";
import { OperationalResult } from "../shared/OperationResult";
import swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-admin-login-setting',
  templateUrl: './admin-location-setting.component.html',
  styleUrls: ['./admin-location-setting.component.css']
})
export class AdminLocationSettingComponent implements OnInit {

  constructor(private adminLocationService:AdminLocationServiceService,private router:Router) { }

  ngOnInit() {
  }


  adminAddLocationForm=new FormGroup({
    locationCityName:new FormControl('',[Validators.required,Validators.pattern("[A-Z]{1}[a-zA-Z]*(?:(?:\. |[' ])[a-zA-Z]+)*"),Validators.maxLength(20)]),
    locationCountryName:new FormControl('',Validators.required)
  });

  result: OperationalResult = {
    Status: false,
    Message: "",
    Result: null,
    StatusCode: null

  };


  locationSetting:ILocation;
  addLocation(adminAddLocationForm){
    swal({
      title: "Adding location",
      text: "please wait..!",
      showConfirmButton: false
    });
    swal.showLoading();
    this.locationSetting=new ILocation();
    this.locationSetting.LocationCity=this.adminAddLocationForm.value.locationCityName;
    this.locationSetting.LocationCountry=this.adminAddLocationForm.value.locationCountryName;
    this.adminLocationService.addLocation(this.locationSetting).subscribe(
      (data: any) => {
        
                this.result = data.valueOf();
                if(this.result.Status)
                  {
                    swal({
                      title: "New location added successfully",
                      text:"",
                      timer: 2000,
                      showConfirmButton: false
                    });
                    this.router.navigate(["/admin"]);
                  }
                  else{
                    swal.close();
                  }
        
      },
      (error: any) => {
        swal.close();
        this.router.navigate(["/error"]);
      }
    );
  }     
}
