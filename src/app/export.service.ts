import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  constructor() { }

  public convertToCsv(data: any, headerList) {
    let str = '';
    let row = '';

    for (let index in headerList) {
     row += headerList[index] + ',';
    }

    row = row.slice(0, -1);
    str += row + '\r\n';

    for (let i = 0; i < data.length; i++) {
     let line = '';
     for (let index in headerList) {
      let head = headerList[index];
      line += data[i][head] + ',';
     }

     line = line.slice(0, -1);
     str += line + '\r\n';
    }
    return str;
  }

  public export(data: any, headers: any[], filename='data') {
    let csvData = this.convertToCsv(data, headers);
    let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);

    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", filename + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }
}
