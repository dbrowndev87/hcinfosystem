import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private globals: Globals) { }

  ngOnInit() {
    if (sessionStorage.getItem('isLoggedIn')) {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('uid');
      this.globals.reloadPage();
    } else {
      this.router.navigate(['/home']);
    }

  }
}