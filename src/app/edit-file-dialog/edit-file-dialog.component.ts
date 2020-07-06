import { Component, OnInit, Inject } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes'
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { File } from '../files/files.component';

@Component({
  selector: 'app-edit-file-dialog',
  templateUrl: './edit-file-dialog.component.html',
  styleUrls: ['./edit-file-dialog.component.css']
})
export class EditFileDialogComponent implements OnInit {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  updatedFile: File = {} as File;

  constructor(@Inject(MAT_DIALOG_DATA) public data: File,
              private _snackBar: MatSnackBar) { }


  ngOnInit() {
    this.updatedFile = JSON.parse(JSON.stringify(this.data));
  }

  areTagsSame(): boolean {
    if (this.data.tags.length !== this.updatedFile.tags.length) return false;

    for (let tag of this.updatedFile.tags) {
      if (!this.data.tags.includes(tag.toLowerCase())) return false;
    }

    return true;
  }

  canUpdate(): boolean {
    return this.updatedFile.owner !== this.data.owner ||
    this.updatedFile.status !== this.data.status ||
    this.updatedFile.country !== this.data.country ||
    this.updatedFile.system !== this.data.system ||
    this.updatedFile.mission !== this.data.mission ||
    this.updatedFile.collector !== this.data.collector ||
    this.updatedFile.duration !== this.data.duration ||
    !this.areTagsSame();
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const tag = value.trim().toLowerCase();
      if (!this.updatedFile.tags.includes(tag)) {
        this.updatedFile.tags.push(value.trim());
      } else {
        this._snackBar.open('Tag already exists', 'OK', {
          duration: 2000,
        });
      }
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(tag: string): void {
    const index = this.updatedFile.tags.indexOf(tag);

    if (index >= 0) {
      this.updatedFile.tags.splice(index, 1);
    }
  }
}
