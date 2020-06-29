import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditFilesDialogComponent } from '../edit-files-dialog/edit-files-dialog.component';

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

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  displayedColumns: string[] = ['select', 'path', 'filename', 'owner', 'status', 'country', 'date', 'system',
  'mission', 'collector', 'duration', 'tags', 'actions'];
  dataSource = new MatTableDataSource<File>();
  selection = new SelectionModel<File>(true, []);
  files: File[] = [
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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.dataSource.data = this.files;
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

  openEditFilesDialog(file: File) {
    const dialogRef = this.dialog.open(EditFilesDialogComponent, {
      data: file,
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._updateFile(result)
      }
    });
  }

  private _updateFile(updatedFile: File) {
    var foundIndex = this.files.findIndex(file => file.filename == updatedFile.filename);
    this.files[foundIndex] = updatedFile;
    this.dataSource.data = this.files;
  }
}
