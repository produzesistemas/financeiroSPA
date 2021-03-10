import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
    selector: 'app-area-adm',
    templateUrl: './area-adm.component.html'
})

export class AreaAdmComponent implements OnInit {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {

    }
}

