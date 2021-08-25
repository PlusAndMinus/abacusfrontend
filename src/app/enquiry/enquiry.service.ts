import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enquiry } from './enquiry.model';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  enquiryList: any;
  enquiryPostListener = new Subject<any>()

  constructor(private http: HttpClient) { }


  postEnquiry(name: string, email: string, mobile: number, course: string) {
    const enquiryData: Enquiry = { name: name, email: email, mobile: mobile, course: course }
    this.http.post('http://localhost:3000/enquire', enquiryData)
      .subscribe(response => {
        console.log(response)
      })
  }

  getEnquiryPostListener() {
    return this.enquiryPostListener.asObservable();
  }

  getEnquirById(id: string) {
    return this.http.get<{data: any}>('http://localhost:3000/enquire/' + id)
  }

  getEnquiry() {
    return this.http.get<{ data: any }>('http://localhost:3000/enquire')
      .pipe(map((response) => {
        return {
          enquiry: response.data.map(e => {
            return {
              id: e._id,
              name: e.name,
              email: e.email,
              mobile: e.mobile,
              course: e.course
            }
          })
        }
      }))

        // .subscribe(transformedRes => {
        //   console.log(transformedRes)
        //   this.enquiryList = transformedRes.enquiry
        //   return this.enquiryList
        // })
  }

  editEnquiry(id: string, updatedEnquiry) {
    return this.http.put('http://localhost:3000/enquire/' + id, updatedEnquiry)
  }

  deleteEnquiry(id: string) {
    return this.http.delete('http://localhost:3000/enquire/' + id)
  }

  
}
