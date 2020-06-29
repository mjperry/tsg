import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { File } from '../files/files.component';

@Component({
  selector: 'app-edit-files-dialog',
  templateUrl: './edit-files-dialog.component.html',
  styleUrls: ['./edit-files-dialog.component.css']
})
export class EditFilesDialogComponent implements OnInit {

  updatedFile: File = {} as File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: File) { }

  ngOnInit() {
    this.updatedFile = JSON.parse(JSON.stringify(this.data));
  }

  canUpdate(): boolean {
    return this.updatedFile.owner !== this.data.owner ||
    this.updatedFile.status !== this.data.status ||
    this.updatedFile.country !== this.data.country ||
    this.updatedFile.system !== this.data.system ||
    this.updatedFile.mission !== this.data.mission ||
    this.updatedFile.collector !== this.data.collector ||
    this.updatedFile.duration !== this.data.duration;
  }
}
