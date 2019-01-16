import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  private typeCode = 0;
  private loggedIn = false;
  constructor() { }

  ngOnInit() {
    if (sessionStorage.getItem('typeCode')) {
      this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);
    }

    if (sessionStorage.getItem('isLoggedIn')) {
      this.loggedIn = true;
    }
  }
}
