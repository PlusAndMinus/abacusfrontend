import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnquiryService } from '../enquiry.service';

@Component({
  selector: 'app-enquiry-form',
  templateUrl: './enquiry-form.component.html',
  styleUrls: ['./enquiry-form.component.css']
})
export class EnquiryFormComponent implements OnInit {

  id = '';
  sName = '';
  sEmail = '';
  sMobile = '';
  sCourse = '';
  private mode = 'create'

  constructor(private enquiryService: EnquiryService, private route: ActivatedRoute, private routing: Router ) { }

  ngOnInit(): void {
    this.route.params.subscribe((param) => {
      const id = param['id']
      if (id) {
        this.mode = 'edit'
        this.enquiryService.getEnquirById(id)
          .subscribe(response => {
            console.log(response)
            this.id = response.data._id,
            this.sName = response.data.name,
            this.sEmail = response.data.email,
            this.sMobile = response.data.mobile,
            this.sCourse = response.data.course
          })
      } else {
        this.mode = 'create'
        this.id = null
      }
    })
  }

  onPostEnquiry(form: NgForm) {
    if(this.mode == 'edit') {
      this.enquiryService.editEnquiry(this.id, form.value)
        .subscribe(response => {
          console.log(response)
          form.resetForm()
        })
    } else {
      this.enquiryService.postEnquiry(form.value.name, form.value.email, form.value.mobile, form.value.course)
      form.resetForm()
      }
    }

}
