import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import * as moment from "moment";
import { HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/AppConstants';
import { GridApi } from 'ag-grid-community';

@Component({
  selector: 'app-interviewer-report',
  templateUrl: './interviewer-report.component.html',
  styleUrls: ['./interviewer-report.component.css']
})
export class InterviewerReportComponent implements OnInit {

  to = '';
  from = '';
  checked: boolean;
  gridApi: GridApi;

  columnDefs = [
    { headerName: 'name', field: 'interviewerName', sortable: true, filter: true },
    { headerName: 'wissenId', field: 'interviewerId', sortable: true, filter: true },
    { headerName: 'count', field: 'count', sortable: true, filter: true },
    { headerName: 'level', field: 'interviewLevel.level', sortable: true, filter: true },
    { headerName: 'tech', field: 'interviewTechnology.technology', sortable: true, filter: true }
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

  fromSelected(event){
    this.from = moment(event.value).format().split('+')[0];
    // console.log(moment(this.to).format());
  }

  toSelected(event){
    this.to = moment(event.value).format().split('+')[0];
    if(this.from){
      this.getReport(this.from, this.to);
    }
  }

  doRequest(url){
    this.http.get(url).subscribe((e: any) => {
      this.rowData = e;
      this.spinner.hide();
    });
  }

  getReport(to, from){
    this.spinner.show();
    if(!this.checked){
      this.doRequest(AppConstants.getInteviewerReport(to,from));
    }else{
      this.doRequest(AppConstants.getInteviewerReportNoSlotGiven(to, from));
    }
  }

  // checkedNoSlots(){
  //   console.log("checked");
  // }

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
