import { Component, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid";
import { BookingService } from '../shared/booking.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { OperationalResult } from '../shared/OperationResult';

@Component
    ({
        selector: 'app-reports',
        templateUrl: './reports.component.html',
        styleUrls: ['./reports.component.css']
    })
export class ReportsComponent implements OnInit {
    private gridApi;
    private gridColumnApi;
    private gridOptions: GridOptions;
    operationResult: OperationalResult;
    constructor(private _bookingdetails: BookingService, private _router: Router) {
        this.gridOptions = <GridOptions>{};
        this.gridOptions.columnDefs =
            [
                {
                    headerName: "User Email",
                    field: "User.Email",
                    width: 200
                },
                {
                    headerName: "Country",
                    field: "Assets.Location.LocationCountry",
                    width: 150
                },
                {
                    headerName: "City",
                    field: "Assets.Location.LocationCity",
                    width: 150
                },
                {
                    headerName: "RoomType",
                    field: "Assets.RoomType",
                    width: 200
                },
                {
                    headerName: "BookingFromDate",
                    field: "BookingFromDate",
                    width: 200
                },
                {
                    headerName: "BookingToDate",
                    field: "BookingToDate",
                    width: 200
                },
                {
                    headerName: "NoOfRooms",
                    field: "NoOfRooms",
                    width: 150
                },
                {
                    headerName: "Amount",
                    field: "Amount",
                    width: 150
                },
                {
                    headerName: "DiscountAmount",
                    field: "DiscountAmount",
                    width: 150,
                },
            ];
    }

    ngOnInit() {
        swal({
            title: "Loading Reports...",
            text: "please wait..!",
            showConfirmButton: false
        });
        swal.showLoading();
        this._bookingdetails.allBookings().subscribe
            (data => {
                this.operationResult = data;
                if (this.operationResult.Status) {
                    swal.close();
                    this.gridOptions.rowData = this.operationResult.Result;
                }else{
                    swal.close();
                }
            },
            (error: any) => {
                swal.close();
                this._router.navigate(["/error"]);
            }
            );
    }
    excelExport() {
        var params = {
            fileName: "Sanctuary Reports",
            sheetName: "Sanctuary Reports"
        };
        this.gridApi.exportDataAsCsv(params);
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        params.api.setRowData(this.gridOptions.rowData);
    }
}
