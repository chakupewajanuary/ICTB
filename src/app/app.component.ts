import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  // title = 'Regi';

  @ViewChild('myModal') model: ElementRef | undefined;

  studentObj: Student = new Student();
  //variable for reading data from server posted
  studentList: Student[] = [];

  ngOnInit(): void {
    const localData = localStorage.getItem('angular17crud');
    if (localData != null) {
      this.studentList = JSON.parse(localData);
    }
  }

  openModel() {
    const model = document.getElementById('myModal');
    if (model != null) {
      model.style.display = 'block';
    }
  }
  closeModel() {
    this.studentObj = new Student();
    if (this.model != null) {
      this.model.nativeElement.style.display = 'none';
    }
  }
  onDelete(item:Student){
    const isDelete=confirm("Are you sure want to Delete");
    if(isDelete){
      const currentRecord = this.studentList.findIndex((m) => m.id === this.studentObj.id);
      this.studentList.splice(currentRecord,1);
      localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    }
  }
  onEdit(item: Student) {
    this.studentObj = item;
    this.openModel();
  }
  updateStudent() {
    const currentRecord = this.studentList.find((m) => m.id === this.studentObj.id);
    if (currentRecord != undefined) {
      currentRecord.name = this.studentObj.name;
      currentRecord.address = this.studentObj.address;
      currentRecord.city = this.studentObj.city;
      currentRecord.email = this.studentObj.email;
      currentRecord.id = this.studentObj.id;
      currentRecord.mobileNo = this.studentObj.mobileNo;
      currentRecord.state = this.studentObj.state;
      currentRecord.pincode = this.studentObj.pincode;
    };
    localStorage.setItem('angular17crud', JSON.stringify(this.studentList));
    this.closeModel();
  }

  saveStudent() {
    debugger;
    const isLocalPresent = localStorage.getItem('angular17crud');

    if (isLocalPresent != null) {
      const oldArr = JSON.parse(isLocalPresent);
      this.studentObj.id = oldArr.length + 1;
      oldArr.push(this.studentObj);
      this.studentList = oldArr;
      localStorage.setItem('angular17crud', JSON.stringify(oldArr));
    } else {
      const newArr = [];
      newArr.push(this.studentObj);
      this.studentObj.id = 1;
      this.studentList = newArr;
      localStorage.setItem('angular17crud', JSON.stringify(newArr));
    }
    this.closeModel();
  }
}

export class Student {
  id: number;
  name: string;
  mobileNo: string;
  email: string;
  city: string;
  state: string;
  pincode: string;
  address: string;

  //constructor to initalize
  constructor() {
    this.id = 0;
    this.name = '';
    this.mobileNo = '';
    this.email = '';
    this.city = '';
    this.state = '';
    this.pincode = '';
    this.address = '';
  }
}
