import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ArquivoEntrada} from 'src/app/_model/arquivo-entrada-model';
import { ArquivoEntradaService } from 'src/app/_services/arquivo-entrada.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-arquivo-entrada',
  templateUrl: './arquivo-entrada.component.html'
})

export class ArquivoEntradaComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  arquivoEntrada: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private arquivoEntradaService: ArquivoEntradaService,
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
    this.arquivoEntradaService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/arquivo-entrada/0/0`]);
  }

  edit(obj: ArquivoEntrada) {
    this.router.navigate([`/arquivo-entrada/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: ArquivoEntrada) {
    this.arquivoEntrada = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.arquivoEntradaService.deleteById(this.arquivoEntrada.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.arquivoEntrada);
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

   onActive(item) {
    this.arquivoEntradaService.active(item).subscribe(result => {
      this.onSubmit();
    });
  }

}
