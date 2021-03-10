import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';
import { MaskedDateOnlyMonthYear } from '../../_helpers/masked-date';
import { ToastrService } from 'ngx-toastr';
import { ContasAPagarService } from 'src/app/_services/contas-a-pagar.service';
import { FileHelper } from 'src/app/_helpers/file-helper';

@Component({
  selector: 'app-contas-pagas-exportacao',
  templateUrl: './contas-pagas-exportacao.component.html',
  styleUrls: ['./contas-pagas-exportacao.component.css']
})

export class ContasPagasExportacaoComponent implements OnInit {
  formDominio: FormGroup;
  submittedDominio = false;

  dateMask = MaskedDateOnlyMonthYear;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private fileHelper: FileHelper,
    private contasAPagarService: ContasAPagarService,) {
  }

  ngOnInit() {
    this.formDominio = this.formBuilder.group({
      dataInicial: ['', Validators.required],
      dataFinal: ['', Validators.required]
    });
  }

  get f() { return this.formDominio.controls; }


  onResetFormExport() {
    this.formDominio.controls.periodo.reset();
  }

  onExportDominio() {
    this.submittedDominio = true;
    if (this.formDominio.invalid) {
      return;
    }
    const filter: FilterDefaultModel = new FilterDefaultModel();
    filter.dataInicial = new Date(this.formDominio.controls.dataInicial.value.year,
      this.formDominio.controls.dataInicial.value.month - 1,
      this.formDominio.controls.dataInicial.value.day, 0, 0, 0, 0);
      filter.dataFinal = new Date(this.formDominio.controls.dataFinal.value.year,
        this.formDominio.controls.dataFinal.value.month - 1,
        this.formDominio.controls.dataFinal.value.day, 0, 0, 0, 0);
    this.contasAPagarService.exportDominio(filter).subscribe((data: any) => {
      if (data) {
        this.fileHelper.Download(data, 'text/plain', 'dominio.txt');
      } else {
        return this.toastr.info("Nenhum pagamento encontrado!")
      }

    });
  }

}
