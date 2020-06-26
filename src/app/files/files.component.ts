import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';

export interface File {
  path: string;
  filename: string;
  owner: string;
  status: string;
  country: string;
  date: string;
  system: string;
  mission: number;
  collector: number;
  duration: number;
  tags: string[];
}

const ELEMENT_DATA: File[] = [
  { path: "/vol/vol/vol/vol/vol/vol/vol/vol/vol/vol/vol/vol/vol/vol/vol", filename: 'fsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfdsfsdfdsfdsfds', owner: "Mike", status: "Active", country: "USA", date: "2020-06-26T12:00:00Z",
    system: "ABC", mission: 111, collector: 1, duration: 30, tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]},
  { path: "/vol", filename: 'fsdfdsfdsfds', owner: "Mike", status: "Active", country: "USA", date: "2020-06-26T12:00:00Z",
  system: "ABC", mission: 111, collector: 1, duration: 30, tags: ["tag1", "tag2", "tag3"]},
  { path: "/vol", filename: 'fsdfdsfdsfds', owner: "Mike", status: "Active", country: "USA", date: "2020-06-26T12:00:00Z",
  system: "ABC", mission: 111, collector: 1, duration: 30, tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]},
  { path: "/vol", filename: 'fsdfdsfdsfds', owner: "Mike", status: "Active", country: "USA", date: "2020-06-26T12:00:00Z",
  system: "ABC", mission: 111, collector: 1, duration: 30, tags: ["tag1", "tag2", "tag3"]},
  { path: "/vol", filename: 'fsdfdsfdsfds', owner: "Mike", status: "Active", country: "USA", date: "2020-06-26T12:00:00Z",
  system: "ABC", mission: 111, collector: 1, duration: 30, tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]}
];

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  displayedColumns: string[] = ['select', 'path', 'filename', 'owner', 'status', 'country', 'date', 'system',
  'mission', 'collector', 'duration', 'tags'];
  dataSource = new MatTableDataSource<File>(ELEMENT_DATA);
  selection = new SelectionModel<File>(true, []);

  constructor() { }

  ngOnInit() {
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

}
