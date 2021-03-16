import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/_model/login-user-model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})

export class UsuarioComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  lst = [];
  usuario: any;

  constructor(
    private modalService: BsModalService,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private router: Router) {
  }

  ngOnInit() {
    this.onSubmit();
  }

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    this.authenticationService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/usuario/0/0`]);
  }

}
