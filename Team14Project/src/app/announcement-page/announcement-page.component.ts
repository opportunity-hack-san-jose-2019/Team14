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
import { UserService } from '../services/user.service';
  
  @Component({
    selector: 'app-announcement-page',
    templateUrl: './announcement-page.component.html',
    styleUrls: ['./announcement-page.component.css']
  })
  
  export class AnnouncementPageComponent implements OnInit {
  
    @ViewChild('eventTable', {static: false}) eventTable: MatTable < any > ;
    currentUser : Object;

    constructor(private router: Router, private userService: UserService) {
    }
  
    ngOnInit() {
      this.userService.getCurrentUser().then((user) => {
          console.log(user)
          this.currentUser = user
      })
    }
  
    logOut() {
      this.router.navigateByUrl('/');
    }
  }
  