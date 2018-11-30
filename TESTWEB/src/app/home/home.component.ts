import { Component, OnInit } from '@angular/core';
import { PersonService } from '../services/person.service';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itemProson = [];
  errMsg = "";
  constructor(private PersonSV: PersonService, private route: Router) { }

  ngOnInit() {
    this.LopData();
  }

  GotoPageCreate() {
    this.route.navigate(['/', 'create']);
  }

  LopData(){
    this.PersonSV.GetPerson().subscribe(
      data => this.itemProson = data,
      error => this.errMsg = error
    );
  }
}
