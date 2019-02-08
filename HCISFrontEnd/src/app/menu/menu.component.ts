/**
 * Name: Menu Component
 * Description: This contains all the functions which pertain to the applications
 * menu.
 * 
 * Author: Darcy Brown
 * Date: January 20th, 2019
 */
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
  private studentId;
  private facultyId;

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

      if (sessionStorage.getItem('studentId')) {
        this.studentId = parseInt(sessionStorage.getItem('studentId'), 0);
      }

      if (sessionStorage.getItem('facultyId')) {
        this.facultyId = parseInt(sessionStorage.getItem('facultyId'), 0);
      }
    }
  }
}
