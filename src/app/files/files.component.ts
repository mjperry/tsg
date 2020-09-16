import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { EditFileDialogComponent } from '../edit-file-dialog/edit-file-dialog.component';
import { EditFilePropertyDialogComponent } from '../edit-file-property-dialog/edit-file-property-dialog.component';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  files: File[] = [
    { path: "/path1", filename: 'File1', 
    owner: "Mike", status: "Active", country: "USA", date: "2020-01-01T12:00:00Z",
    system: "ABC", mission: 111, collector: 1, duration: 1, tags: ["tag1"]},
    { path: "/path2", filename: 'File2', 
    owner: "Mike", status: "Active", country: "USA", date: "2020-01-02T12:00:00Z",
    system: "DEF", mission: 222, collector: 2, duration: 2, tags: ["tag2"]},
    { path: "/path3", filename: 'File3', 
    owner: "Mike", status: "Active", country: "USA", date: "2020-01-03T12:00:00Z",
    system: "GHI", mission: 333, collector: 3, duration: 3, tags: ["tag3"]},
    { path: "/path4", filename: 'File4', 
    owner: "Mike", status: "Active", country: "USA", date: "2020-01-04T12:00:00Z",
    system: "JKL", mission: 444, collector: 4, duration: 4, tags: ["tag4"]},
    { path: "/path5", filename: 'File5', 
    owner: "Mike", status: "Active", country: "USA", date: "2020-01-05T12:00:00Z",
    system: "MNO", mission: 555, collector: 5, duration: 5, tags: ["tag5"]},
  ];
  selectedOption = '';
  selectedOptions: string[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataSource.data = this.files;
    this.dataSource.paginator = this.paginator;
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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

  openEditFileDialog(file: File) {
    const dialogRef = this.dialog.open(EditFileDialogComponent, {
      data: file,
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._updateFile(result);
        this.selection.clear();
        this._snackBar.open('File updated', 'OK', {
          duration: 2000,
        });
      }
    });
  }

  onSelection(value: any) {
    const index = this.options.indexOf(value);
    if (index >= 0) {
      this.options.splice(index, 1);
    }
    this.selectedOptions.push(value);
    this.myControl.setValue('');
  }

  openEditFilesDialog(propType: string) {
    const dialogRef = this.dialog.open(EditFilePropertyDialogComponent, {
      data: {
        propType,
        files: this.selection.selected,
      },
      width: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        for (const updatedFile of this.selection.selected) {
          this._updateProperty(updatedFile, propType, result);
        }
        this.selection.clear();
        this._snackBar.open('Property updated', 'OK', {
          duration: 2000,
        });
      }
    });
  }

  removeOption(option: string) {
    const index = this.selectedOptions.indexOf(option);
    if (index >= 0) {
      this.selectedOptions.splice(index, 1);
    }
    this.options.push(option);
    this.options.sort();
    this.myControl.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _updateFile(updatedFile: File) {
    let foundIndex = this.files.findIndex(file => file.filename === updatedFile.filename);
    this.files[foundIndex] = updatedFile;
    this.dataSource.data = this.files;
  }

  private _updateProperty(updatedFile: File, propertyType: string, propertyValue: any) {
    let foundIndex = this.files.findIndex(file => file.filename === updatedFile.filename);

    switch(propertyType.toLowerCase()) {
      case 'owner':
        this.files[foundIndex].owner = propertyValue;
        break;
      case 'status':
        this.files[foundIndex].status = propertyValue;
        break;
      case 'country':
        this.files[foundIndex].country = propertyValue;
        break;
      case 'system':
        this.files[foundIndex].system = propertyValue;
        break;
      case 'mission':
        this.files[foundIndex].mission = propertyValue;
        break;
      case 'collector':
        this.files[foundIndex].collector = propertyValue;
        break;
      default:
    }

    this.dataSource.data = this.files;
  }
}
