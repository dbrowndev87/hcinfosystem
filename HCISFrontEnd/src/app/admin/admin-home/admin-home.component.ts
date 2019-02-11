import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  public isLoaded;
  public typeCode;

  constructor() { }

  ngOnInit() {
    this.typeCode = parseInt(sessionStorage.getItem('typeCode'), 0);
    this.isLoaded = true;
  }

}
