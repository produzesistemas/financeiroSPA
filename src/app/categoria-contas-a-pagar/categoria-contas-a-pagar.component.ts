import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CategoriaContasAPagar } from 'src/app/_model/categoria-contas-a-pagar-model';
import { CategoriaContasAPagarService } from 'src/app/_services/categoria-contas-a-pagar.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-categoria-contas-a-pagar',
  templateUrl: './categoria-contas-a-pagar.component.html'
})

export class CategoriaContasAPagarComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  categoriaContasAPagar: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private categoriaContasAPagarService: CategoriaContasAPagarService,
    private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      conta: ['']
    });
    this.onSubmit();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    filter.name = this.form.controls.conta.value;
    this.categoriaContasAPagarService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/categoria-contas-a-pagar/0/0`]);
  }

  edit(obj: CategoriaContasAPagar) {
    this.router.navigate([`/categoria-contas-a-pagar/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: CategoriaContasAPagar) {
    this.categoriaContasAPagar = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.categoriaContasAPagarService.deleteById(this.categoriaContasAPagar.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.categoriaContasAPagar);
      if (index !== -1) {
        this.lst.splice(index, 1);
      }
      this.closeDelete();
      this.toastr.success('Excluído com sucesso!', '');
    });
  }

  closeDelete() {
  this.modalDelete.hide();
  }
}
