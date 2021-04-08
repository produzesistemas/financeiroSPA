import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-accounting-header',
  templateUrl: './accounting-header.component.html'
})
export class AccountingHeaderComponent implements OnInit {

  public currentUser;
  constructor(  private authenticationService: AuthenticationService,
                private router: Router,
                private toastr: ToastrService) { }

  ngOnInit() {
    this.currentUser = this.authenticationService.getCurrentUser();
    if (!this.currentUser) {
      this.logout();
    }
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['index']);
  }

  alterarUsuario() {
    this.router.navigate(['alterar-usuario']);
  }

}
