import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { DashboardService } from '../_services/dashboard.service';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})

export class DashboardComponent implements OnInit {
    public lst: any;
    constructor(
        private router: Router,
        private dashboardService: DashboardService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.dashboardService.getDashboard().subscribe(result => {
            this.lst = result;
        });
    }
}

