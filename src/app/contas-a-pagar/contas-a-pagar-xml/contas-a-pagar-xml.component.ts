import { Component, ElementRef, Injectable, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContasAPagarService } from 'src/app/_services/contas-a-pagar.service';
import { FileHelper } from 'src/app/_helpers/file-helper';
import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contas-a-pagar-xml',
  templateUrl: './contas-a-pagar-xml.component.html'
})
export class ContasAPagarXMLComponent implements OnInit {
  submitted = false;
  submittedConvert = false;
  fileToUpload: File = null;
  public file: any;
  @ViewChild('fileUpload') fileUpload: ElementRef;
  @ViewChild('analise') public templateref: TemplateRef<any>;
  modalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private fileHelper: FileHelper,
    private contasAPagarService: ContasAPagarService
  ) { }

  ngOnInit() {

    }

    onSubmit() {
      this.submitted = true;
      if (this.file === undefined) {
        this.toastr.error('Selecione um arquivo!');
        return;
      }
      if (this.file.type !== 'text/xml') {
          this.onResetFileChange();
          this.toastr.error('Só é permitido arquivo no formato xml');
          return;
        }

      const formData = new FormData();
      formData.append('file', this.file);
      this.contasAPagarService.lancamentoNF(formData).subscribe(result => {
        if (result) {
          this.modalRef = this.modalService.show(this.templateref, { class: 'modal-xl' });
          this.toastr.success('Análise efetuada com sucesso!');
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

        if (event.target.files[0].type !== 'text/xml') {
          this.onResetFileChange();
          this.toastr.error('Só é permitido converter arquivos no formato xml');
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



