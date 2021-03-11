import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Fornecedor } from 'src/app/_model/fornecedor-model';
import { FornecedorService } from 'src/app/_services/fornecedor.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html'
})

export class FornecedorComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  fornecedor: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private fornecedorService: FornecedorService,
    private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      nome: ['']
    });
    this.onSubmit();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    filter.name = this.form.controls.nome.value;
    this.fornecedorService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/fornecedor/0/0`]);
  }

  edit(obj: Fornecedor) {
    this.router.navigate([`/fornecedor/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: Fornecedor) {
    this.fornecedor = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.fornecedorService.deleteById(this.fornecedor.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.fornecedor);
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
