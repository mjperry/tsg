import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-file-property-dialog',
  templateUrl: './edit-file-property-dialog.component.html',
  styleUrls: ['./edit-file-property-dialog.component.css']
})
export class EditFilePropertyDialogComponent implements OnInit {
  updatedProperty = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {}

  canUpdate(): boolean {
    return this.updatedProperty !== '';
  }

}
