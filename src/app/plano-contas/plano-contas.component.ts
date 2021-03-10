import { Component, OnInit, TemplateRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { PlanoContas } from 'src/app/_model/plano-contas-model';
import { PlanoContasService } from 'src/app/_services/plano-contas.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';

@Component({
  selector: 'app-plano-contas',
  templateUrl: './plano-contas.component.html'
})

export class PlanoContasComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  modalImportar: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  erros = [];
  @ViewChild('modalImportar') public templateref: TemplateRef<any>;
  planocontas: any;
  @Output() action = new EventEmitter();
  page = 1;
  pageSize = 5;
  fileToUpload: File = null;

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private planocontasService: PlanoContasService,
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
    this.planocontasService.getByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

  onNew() {
    this.router.navigate([`/plano-contas/0/0`]);
  }

  edit(obj: PlanoContas) {
    this.router.navigate([`/plano-contas/${obj.id}/1`]);
  }

  deleteById(template: TemplateRef<any>, item: PlanoContas) {
    this.planocontas = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.planocontasService.deleteById(this.planocontas.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.planocontas);
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

  closeImportar() {
    this.modalImportar.hide();
    }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.onUpload();
  }

  onUpload() {
    const formData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    this.planocontasService.importarDominio(formData).subscribe(result => {
      this.erros = result;
      this.modalImportar = this.modalService.show(this.templateref, { class: 'modal-lg' });

    });
  }
}
