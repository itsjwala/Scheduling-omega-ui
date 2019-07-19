import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-previous-schedule',
  templateUrl: './previous-schedule.component.html',
  styleUrls: ['./previous-schedule.component.css']
})
export class PreviousScheduleComponent implements OnInit {

  sortedSchedules = [];
  previousSchedules = [
    {
      id: 1,
      date: '2019-07-18',
      to: '05:00',
      from: '08:00',
      tech: 'Java',
      round: 'R1',
      name: 'John Doe'
    },
    {
      id: 2,
      date: '2019-07-18',
      to: '18:00',
      from: '21:00',
      tech: 'Angular',
      round: 'R2',
      name: 'Barry Allen'
    }
  ];

  columnDefs = [
    { headerName: 'id', field: 'id', sortable: true, filter: true },
    { headerName: 'date', field: 'date', sortable: true, filter: true },
    { headerName: 'to', field: 'to', sortable: true, filter: true },
    { headerName: 'from', field: 'from', sortable: true, filter: true },
    { headerName: 'tech', field: 'tech', sortable: true, filter: true },
    { headerName: 'round', field: 'round', sortable: true, filter: true },
    { headerName: 'name', field: 'name', sortable: true, filter: true },
    { headerName: 'feedback', field: 'feedback', editable: true },
    {
      headerName: 'status', field: 'status', editable: true,
      // cellRenderer: 'statusCellRenderer',
      // cellEditor: 'agRichSelectCellEditor',
      // cellEditorParams: {
      //   cellRenderer: 'statusCellRenderer',
      //   values: ['Accepted', 'Rejected', 'Pending']
      // }
    }
  ];

  gridOptions = {
    defaultColDef: {
      resizable: true,
    },
    columnDefs: this.columnDefs,
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      params.api.sizeColumnsToFit();
    },
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
    this.rowData = this.previousSchedules;
  }

  // StatusCellRenderer(params) {
  //   return params.value;
  // }
}
