import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ContaDePara } from 'src/app/_model/conta-de-para-model';
import { ContaDeParaService } from 'src/app/_services/conta-de-para.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-conta-de-para',
  templateUrl: './conta-de-para.component.html'
})

export class ContaDeParaComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  contaDePara: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private contaDeParaService: ContaDeParaService,
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
    this.contaDeParaService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/conta-de-para/0/0`]);
  }

  edit(obj: ContaDePara) {
    this.router.navigate([`/conta-de-para/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: ContaDePara) {
    this.contaDePara = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.contaDeParaService.deleteById(this.contaDePara.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.contaDePara);
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
