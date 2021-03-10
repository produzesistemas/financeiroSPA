import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { CentroCusto } from 'src/app/_model/centro-custo-model';
import { CentroCustoService } from 'src/app/_services/centro-custo.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-centro-custo',
  templateUrl: './centro-custo.component.html'
})

export class CentroCustoComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  centroCusto: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private centroCustoService: CentroCustoService,
    private router: Router) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      descricao: ['']
    });
    this.onSubmit();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    filter.name = this.form.controls.descricao.value;
    this.centroCustoService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/centro-custo/0/0`]);
  }

  edit(obj: CentroCusto) {
    this.router.navigate([`/centro-custo/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: CentroCusto) {
    this.centroCusto = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.centroCustoService.deleteById(this.centroCusto.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.centroCusto);
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
