import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  opened: boolean;
  programStructure: boolean;
  benefits: boolean;
  FAQs: boolean;

  @ViewChild('sidenav') sidenav: MatSidenav
  
  constructor() { }

  ngOnInit(): void {
    this.programStructure = true;
    this.benefits = true;
    this.FAQs = true;
  }

  onProgramStructure() {
    this.programStructure = true;
    this.benefits = false;
    this.FAQs = false;
  }

  onBenefits() {
    this.benefits = true;
    this.programStructure = false
    this.FAQs = false;
  }

  onFAQs() {
    this.FAQs = true;
    this.programStructure = false;
    this.benefits = false
  }

  displayAll() {
    this.programStructure = true;
    this.benefits = true;
    this.FAQs = true;
  }
}
