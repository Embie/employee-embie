import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent  {
  title = 'employee';
 /// result =[];
  fileContent: string = '';
  data = [
    {
      EmpID: '143',
      ProjectID:'12',
      DateFrom :'2013-11-01',
      DateTo:'2014-01-05'	
    },
    {
      EmpID: '218',
      ProjectID:'10',
      DateFrom :'2012-05-16',
      DateTo:null
    },
    {
      EmpID: '218',
      ProjectID:'10',
      DateFrom :'2012-05-16',
      DateTo:null
    },
    {
      EmpID: '143',
      ProjectID:'10',
      DateFrom :'2009-01-01',
      DateTo:'2011-04-27'
    }
  ]
  employees =[];
  public uploadFile(fileList: FileList): void {
    let file = fileList[0];
    let fileReader: FileReader = new FileReader();
    let self = this;
    fileReader.onloadend = function(x) {
      self.fileContent = fileReader.result as string;
      let lines = self.fileContent.split('\n');
      for(let line = 0; line < lines.length; line++){
        console.log(lines[line]);
      }
    }
    fileReader.readAsText(file);
  }
 
  calculateDiff(fromDate,toDate) {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let currentDay = mm + '-' + dd + '-' + yyyy;
    let date1 = new Date(fromDate);
    let date2 = toDate == null ? new Date(currentDay) :new Date(toDate);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    return diffDays;
  }
  
  searchEmployee(array) {
  let found;
  for (let index = 0; index < array.length; index++) {
      const element = array[index];
      element.days = this.calculateDiff(element.DateFrom,element.DateTo)
     //// let found = array.index(element => element.ProjectID == element.ProjectID);
      if (found == element.ProjectID) {
      this.employees.push(element);
      }
     found = element.ProjectID;
    }
    this.employees.sort(function(a, b){return b.days-a.days}); 
  } 
  
}
