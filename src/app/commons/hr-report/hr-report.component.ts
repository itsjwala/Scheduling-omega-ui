import { AppConstants } from './../../AppConstants';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from "moment";
import { GridApi } from '../../../../node_modules/ag-grid-community';

@Component({
  selector: 'app-hr-report',
  templateUrl: './hr-report.component.html',
  styleUrls: ['./hr-report.component.css']
})
export class HrReportComponent implements OnInit {

  // reportHR = [];
  to = '';
  from = '';
  gridApi: GridApi;

  columnDefs = [
    { headerName: 'name', field: 'hrName', sortable: true, filter: true },
    { headerName: 'email', field: 'hrEmail', sortable: true, filter: true },
    { headerName: 'wissenId', field: 'hrWissenId', sortable: true, filter: true },
    { headerName: 'phoneNumber', field: 'hrPhone', sortable: true, filter: true },
    { headerName: 'active', field: 'hrActive', sortable: true, filter: true },
    { headerName: 'count', field: 'count', sortable: true, filter: true }
  ];

  gridOptions = {
    defaultColDef: {
      resizable: true,
    },
    columnDefs: this.columnDefs,
    // onGridReady(params) {
    //   this.gridApi = params.api;
    //   this.gridColumnApi = params.columnApi;
    //   params.api.sizeColumnsToFit();
    // },
  }

  rowData: any;


  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  onGridReady(params) {
    console.log(params);
    this.gridApi = params.api;
    // this.gridApi = params.columnApi;
    console.log(this.gridApi);
  }

  toSelected(event){
    this.to = moment(event.value).format().split('+')[0];
    // console.log(moment(this.to).format());
  }

  fromSelected(event){
    this.from = moment(event.value).format().split('+')[0];
    if(this.to){
      this.getReport(this.from, this.to);
    }
  }

  getReport(to, from){
    this.spinner.show();
    this.http.get(AppConstants.getHRReport(from, to)).subscribe((e: any) => {
      this.rowData = e;
      this.spinner.hide();
    });
  }

  exportExcel(){
    const params = {
      columnGroups: true,
      allColumns: true,
      fileName: 'report'
    };
    console.log("pressed");
    this.gridApi.exportDataAsCsv(params);
  }

}
