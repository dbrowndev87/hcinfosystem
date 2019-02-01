/**
 * Name: Logout Component
 * Description: This component implements the logout process.
 * 
 * Author: Darcy Brown
 * Date: January 24th, 2019
 */
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
    // If there is logged in sessions
    if (sessionStorage.getItem('isLoggedIn')) {

      // Remove type code and logged in sessions.
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('typeCode');


      // If there is a Type of ID stored remove it.
      if (sessionStorage.getItem('studentId')) {
        sessionStorage.removeItem('studentId');

      } else if (sessionStorage.getItem('facultyId')) {
        sessionStorage.removeItem('facultyId');

      } else if (sessionStorage.getItem('userId')) {
        sessionStorage.removeItem('userId');

      }

      // reload page.
      this.globals.reloadPage();

    } else {
      // else go home.
      this.router.navigate(['/home']);
    }

  }
}