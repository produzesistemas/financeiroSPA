import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-accounting-layout',
  templateUrl: './accounting-layout.component.html'
})
export class AccountingLayoutComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }

}
