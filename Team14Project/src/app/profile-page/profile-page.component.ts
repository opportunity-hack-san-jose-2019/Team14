import {
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  MatTable
} from '@angular/material/table';

import axios from 'axios';

import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Observable
} from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  @ViewChild('eventTable', { static: false }) eventTable: MatTable < any > ;
  user: Object;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.user = JSON.parse(params.user);
      console.log(this.user);
    }); 

  }

  isVolunteer = false;

  appName = 'Braven';

  displayedColumns: string[] = ['title', 'location', 'time', 'action'];

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl('/');
  }

  getAuth() {
    var user = {
      email: window.atob(localStorage.getItem('user')).split(":")[0],
      password: window.atob(localStorage.getItem('user')).split(":")[1]
    }

    return user;
  }
}
