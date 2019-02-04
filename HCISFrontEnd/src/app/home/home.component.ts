import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {

    if (!sessionStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    } else if (parseInt(sessionStorage.getItem('typeCode'), 0) === 1) {
      this.router.navigate(['/admin/home']);
    } else if (parseInt(sessionStorage.getItem('typeCode'), 0) === 2) {
      this.router.navigate(['/faculty/home']);
    } else if (parseInt(sessionStorage.getItem('typeCode'), 0) === 3) {
      this.router.navigate(['/student/home']);
    }
  }

}

