import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EnquiryService } from '../enquiry.service';


@Component({
  selector: 'app-enquiry-list',
  templateUrl: './enquiry-list.component.html',
  styleUrls: ['./enquiry-list.component.css']
})
export class EnquiryListComponent implements OnInit {
  // data = [
  //   // {name: 'Kushaal', email: 'kkk@gmail.com', 'mobile': 989898989, course: 'Abacus'}
  // ]
  enquiryDataArray: MatTableDataSource<any>

  displayedColumns: string[] = ['name', 'email', 'mobile', 'course', 'actions']
  dataSource;

  constructor(
    private enquiryService: EnquiryService
    ) { 
  }

  ngOnInit(): void {
    this.enquiryService.getEnquiry().subscribe(enquiryData => {
      this.enquiryDataArray = new MatTableDataSource(enquiryData.enquiry)
      console.log(this.enquiryDataArray)
      this.dataSource = this.enquiryDataArray

      // this.data.push(enquiryData)
      // console.group(this.data)
    })
  }

  onDelete(enqId) {
    this.enquiryService.deleteEnquiry(enqId)
      .subscribe((response) => {
        this.enquiryService.getEnquiry().subscribe(enquiryData => {
          this.enquiryDataArray = new MatTableDataSource(enquiryData.enquiry)
          console.log(this.enquiryDataArray)
          this.dataSource = this.enquiryDataArray
        })
        console.log(response)
      })
  }


}
