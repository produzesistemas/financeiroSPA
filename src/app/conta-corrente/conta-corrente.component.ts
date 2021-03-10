import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ContaCorrente } from 'src/app/_model/conta-corrente-model';
import { ContaCorrenteService } from 'src/app/_services/conta-corrente.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-conta-corrente',
  templateUrl: './conta-corrente.component.html'
})

export class ContaCorrenteComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  contaCorrente: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private contaCorrenteService: ContaCorrenteService,
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
    this.contaCorrenteService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/conta-corrente/0/0`]);
  }

  edit(obj: ContaCorrente) {
    this.router.navigate([`/conta-corrente/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: ContaCorrente) {
    this.contaCorrente = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.contaCorrenteService.deleteById(this.contaCorrente.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.contaCorrente);
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
