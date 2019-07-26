import { AppConstants } from 'src/app/AppConstants';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-previous-schedule',
  templateUrl: './previous-schedule.component.html',
  styleUrls: ['./previous-schedule.component.css']
})
export class PreviousScheduleComponent implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');


    let url = "";
    let empId = Number.parseInt(this.authService.getEmployeeId());

    if (this.authService.getRole() === "HR") {
      this.columnDefs[6].editable = false;
      this.columnDefs[7].editable = false;

      url = AppConstants.getPreviousSlotsHr(empId);
    }
    else if(this.authService.getRole() === "INTERVIEWER"){
      url = AppConstants.getPreviousSlotsInterviewer(empId);
      this.columnDefs = this.columnDefs.splice(3, 1);
    }
    console.log(this.columnDefs)
    console.log(url);

    this.http.get(url).subscribe((e: any) => {
      // this.rowData = e;
      console.log(e);
      this.rowData = e.map(curr => {
        curr.scheduleResponseDTO.slot.date = curr.scheduleResponseDTO.slot.from.split('T')[0];
        curr.scheduleResponseDTO.slot.from = curr.scheduleResponseDTO.slot.from.split('T')[1];
        curr.scheduleResponseDTO.slot.to = curr.scheduleResponseDTO.slot.to.split('T')[1];
        return curr;
      })
      console.log(this.rowData);

    })
  }
  sortedSchedules = [];

  columnDefs = [
    // { headerName: 'id', field: 'scheduleId', sortable: true, filter: true },
    { headerName: 'date', field: 'scheduleResponseDTO.slot.date', sortable: true, filter: true },
    { headerName: 'from', field: 'scheduleResponseDTO.slot.from', sortable: true, filter: true },
    { headerName: 'to', field: "scheduleResponseDTO.slot.to", sortable: true, filter: true },
    { headerName: 'interviewer name', field: "scheduleResponseDTO.interviewerName", sortable: true, filter: true },
    { headerName: 'tech', field: 'scheduleResponseDTO.technology', sortable: true, filter: true },
    { headerName: 'round', field: 'scheduleResponseDTO.level', sortable: true, filter: true },
    { headerName: 'name', field: 'scheduleResponseDTO.candidate.name', sortable: true, filter: true },
    { headerName: 'feedback', field: 'feedbackDTO.feedback', editable: true },
    {
      headerName: 'status', field: 'feedbackDTO.status', editable: true,
      // cellRenderer: 'statusCellRenderer',
      cellEditor: 'agSelectCellEditor',
      cellEditorParams: {
        values: ['ACCEPTED', 'REJECTED']
      }
    }
  ];





  gridOptions: GridOptions = {
    defaultColDef: {
      resizable: true,
    },
    columnDefs: this.columnDefs,
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();
    },
    onCellValueChanged: (event) => {
      console.log(event);
      if (event.data.feedbackDTO.status && event.data.feedbackDTO.feedback) {
        console.log("sending feedback");
        console.log({
          'scheduleId': event.data.scheduleResponseDTO.scheduleID,
          'feedback': event.data.feedbackDTO.feedback,
          'status': event.data.feedbackDTO.status
        })
        this.http.post(AppConstants.postFeedback(1), {
          'scheduleId': event.data.scheduleResponseDTO.scheduleID,
          'feedback': event.data.feedbackDTO.feedback,
          'status': event.data.feedbackDTO.status
        }).subscribe(e => {
        });
      }
    }

  }



  rowData: any;

  addFeedback(event) {
    console.log(event);
  }

}
