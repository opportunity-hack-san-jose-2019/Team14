import {
    Component,
    OnInit,
    ViewChild,
    NgModule
  } from '@angular/core';
  
  import {
    MatTable
  } from '@angular/material/table';
  import { Router } from '@angular/router';
  
  @Component({
    selector: 'app-announcement-page',
    templateUrl: './announcement-page.component.html'
  })
  
  export class AnnouncementPageComponent implements OnInit {
  
    @ViewChild('eventTable', {static: false}) eventTable: MatTable < any > ;
  
  
    constructor(private router: Router) {}
  
    ngOnInit() {}
  
    logOut() {
      this.router.navigateByUrl('/');
    }
  }
  