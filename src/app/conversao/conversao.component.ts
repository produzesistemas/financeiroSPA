import { Component, ElementRef, Injectable, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ArquivoEntrada } from '../_model/arquivo-entrada-model';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { ArquivoEntradaService } from '../_services/arquivo-entrada.service';
import { ConversaoService } from '../_services/conversao.service';
import { FileHelper } from 'src/app/_helpers/file-helper';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-conversao',
  templateUrl: './conversao.component.html'
})
export class ConversaoComponent implements OnInit {
  formAdd: FormGroup;
  formConv: FormGroup;
  submitted = false;
  submittedConvert = false;
  lstArquivos = [];
  lst: any[];
  fileToUpload: File = null;
  public file: any;
  model: NgbDateStruct;
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('analise') public templateref: TemplateRef<any>;
  modalRef: BsModalRef;
  page = 1;
  pageSize = 5;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private arquivoEntradaService: ArquivoEntradaService,
    private modalService: BsModalService,
    private fileHelper: FileHelper,
    private conversaoService: ConversaoService
  ) { }

  get f() { return this.formAdd.controls; }
  get fc() { return this.formConv.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
      arquivoEntrada: ['',  Validators.required]
      });
    this.formConv = this.formBuilder.group({
        dataInicial: ['',  Validators.required],
        dataFinal: ['',  Validators.required]
        });
    const filter: FilterDefaultModel = new FilterDefaultModel();
    this.arquivoEntradaService.getByFilter(filter).subscribe(
        data => {
          this.lstArquivos = data;
        }
      );
    }

    onSubmit() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      if (this.file === undefined) {
        this.toastr.error('Selecione um arquivo!');
        return;
      }
      const extension = this.file.name.split('.');
      if (extension[1] !== 'csv') {
          this.onResetFileChange();
          this.toastr.error('Só é permitido converter arquivos no formato CSV');
          return;
        }

      const formData = new FormData();
      let arquivoEntrada = new ArquivoEntrada();
      arquivoEntrada = this.formAdd.controls.arquivoEntrada.value;
      formData.append('arquivoEntrada', JSON.stringify(arquivoEntrada));
      formData.append('file', this.file);
      this.conversaoService.analise(formData).subscribe(result => {
        if (result) {
          this.lst = [];
          this.lst = result;
          this.modalRef = this.modalService.show(this.templateref, { class: 'modal-xl' });
          this.toastr.success('Análise efetuada com sucesso!');
        }
    });

    }

    onConvert() {
      this.submittedConvert = true;
      if (this.formConv.invalid) {
        return;
      }
      const conversao = {
        dataInicial: new Date(this.formConv.controls.dataInicial.value.year,
          this.formConv.controls.dataInicial.value.month - 1,
          this.formConv.controls.dataInicial.value.day, 0, 0, 0, 0),
        dataFinal: new Date(this.formConv.controls.dataFinal.value.year,
          this.formConv.controls.dataFinal.value.month - 1,
          this.formConv.controls.dataFinal.value.day, 0, 0, 0, 0),
        partidas: this.lst
       };

      this.conversaoService.conversao(conversao).subscribe(result => {
        if (result) {
          this.toastr.success('Convertido com sucesso!');
          this.fileHelper.Download(result, 'text/plain', 'dominio_partidas_dobradas.txt');
          this.close();
        }
    });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
          this.file = event.target.files[0];
          // this.fileUpload = this.file;
        }
        if (event.target.files[0].size > 5242880) {
          this.toastr.error('Não é permitido anexar arquivos acima de 5MB.');
          return;
        }
        const extension = event.target.files[0].name.split('.');
        if (extension[1] !== 'csv') {
          this.onResetFileChange();
          this.toastr.error('Só é permitido converter arquivos no formato CSV');
          return;
        }
      }

      onResetFileChange() {
        this.fileUpload.nativeElement.value = '';
    }

    close() {
      this.modalRef.hide();
      }
}



