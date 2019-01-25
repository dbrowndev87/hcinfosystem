import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  private typeCode = 0;
  private loggedIn = false;
  private userId = 0;

  constructor(
    private router: Router,
    private globals: Globals
  ) {
    if (sessionStorage.getItem('userId')) {
      this.userId = parseInt(sessionStorage.getItem('userId'), 0);
    }
  }

  ngOnInit() {
    if (sessionStorage.getItem('typeCode')) {
      this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);
    }

    if (sessionStorage.getItem('isLoggedIn')) {
      this.loggedIn = true;
    }
  }

  loadCreateUser(typeCode: number) {
    this.router.navigate(['/user/create/' + typeCode]);
    this.globals.reloadPage();
  }
}
