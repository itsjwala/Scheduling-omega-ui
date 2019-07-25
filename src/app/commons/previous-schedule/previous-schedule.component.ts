import { AppConstants } from 'src/app/AppConstants';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-previous-schedule',
  templateUrl: './previous-schedule.component.html',
  styleUrls: ['./previous-schedule.component.css']
})
export class PreviousScheduleComponent implements OnInit {

  sortedSchedules = [];
  // previousSchedules = [
  //   {
  //     id: 1,
  //     date: '2019-07-18',
  //     to: '05:00',
  //     from: '08:00',
  //     tech: 'Java',
  //     round: 'R1',
  //     name: 'John Doe'
  //   },
  //   {
  //     id: 2,
  //     date: '2019-07-18',
  //     to: '18:00',
  //     from: '21:00',
  //     tech: 'Angular',
  //     round: 'R2',
  //     name: 'Barry Allen'
  //   }
  // ];

  columnDefs = [
    // { headerName: 'id', field: 'scheduleId', sortable: true, filter: true },
    { headerName: 'date', field: 'scheduleResponseDTO.slot.date', sortable: true, filter: true },
    { headerName: 'from', field: 'scheduleResponseDTO.slot.from', sortable: true, filter: true },
    { headerName: 'to', field: "scheduleResponseDTO.slot.to", sortable: true, filter: true },
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
    // components: {
    //   statusCellRenderer: this.StatusCellRenderer,
    // }
  }

  // rowData = [
  //   { make: 'Toyota', model: 'Celica', price: 35000 },
  //   { make: 'Ford', model: 'Mondeo', price: 32000 },
  //   { make: 'Porsche', model: 'Boxter', price: 72000 }
  // ];

  rowData: any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    // this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
    this.http.get(AppConstants.getPreviousSLots(1)).subscribe((e: any) => {
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

  addFeedback(event) {
    console.log(event);
  }
  // StatusCellRenderer(params) {
  //   return params.value;
  // }
}
