import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from '../shared/services/previous-route.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public homeText: string;
  private typeCode: number;
  private previousUrl;

  constructor(private previousRoute: PreviousRouteService) { }

  ngOnInit() {
    this.homeText = "Project GoldStar";
    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);
    // get the previous URL.
    this.previousUrl = this.previousRoute.getPreviousUrl();
  }

}
