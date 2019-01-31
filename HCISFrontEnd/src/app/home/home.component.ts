import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from '../shared/services/previous-route.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public homeText: string;
  private typeCode: number;
  private previousUrl;


  constructor(private previousRoute: PreviousRouteService, private router: Router) { }

  ngOnInit() {

    // If the usertype is not any of the type codes go to 404
    if (!sessionStorage.getItem('isLoggedIn')) {
      this.router.navigate(['/login']);
    }


    this.homeText = "Happy College Information System";
    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);
    // get the previous URL.
    this.previousUrl = this.previousRoute.getPreviousUrl();
  }

}
