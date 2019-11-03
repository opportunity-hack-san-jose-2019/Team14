import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
    @Input() pageName: string;
    signedIn : boolean;

    constructor(private snackBar: MatSnackBar, private router: Router) { }

    ngOnInit() {
    }


    logOut() {
      localStorage.clear();
      this.router.navigateByUrl('/');
    }

}
