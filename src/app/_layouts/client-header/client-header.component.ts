import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-header',
  templateUrl: './client-header.component.html'
})
export class ClientHeaderComponent implements OnInit {

  public menus: any[];
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
