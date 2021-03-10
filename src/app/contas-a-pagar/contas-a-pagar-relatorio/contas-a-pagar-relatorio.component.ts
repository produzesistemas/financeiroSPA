import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ContasAPagarService } from 'src/app/_services/contas-a-pagar.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterDefaultModel } from '../../_model/filter-default-model';
import { forkJoin } from 'rxjs';
import { FornecedorService } from 'src/app/_services/fornecedor.service';
import { PlanoContasService } from 'src/app/_services/plano-contas.service';
import { CategoriaContasAPagarService } from 'src/app/_services/categoria-contas-a-pagar.service';
import { ContaCorrenteService } from 'src/app/_services/conta-corrente.service';
import { CentroCustoService } from 'src/app/_services/centro-custo.service';
import { FileHelper } from 'src/app/_helpers/file-helper';
import { MaskedDateOnlyMonthYear } from '../../_helpers/masked-date';

@Component({
  selector: 'app-contas-a-pagar-relatorio',
  templateUrl: './contas-a-pagar-relatorio.component.html',
  styleUrls: ['./contas-a-pagar-relatorio.component.css']
})

export class ContasAPagarRelatorioComponent implements OnInit {
  formFornecedor: FormGroup;
  formProvisao: FormGroup;
  submittedFornecedor = false;
  submittedProvisao = false;
  public lstFornecedor: any[] = [];
  public lstPlanoContas: any[] = [];
  public lstCategorias: any[] = [];
  public lstCentroCusto: any[] = [];
  public lstContaCorrente: any[] = [];
  dateMask = MaskedDateOnlyMonthYear;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private fileHelper: FileHelper,
    private authenticationService: AuthenticationService,
    private contasAPagarService: ContasAPagarService,
    private router: Router,
    private fornecedorService: FornecedorService,
    private planoContasService: PlanoContasService,
    private categoriaContasAPagarService: CategoriaContasAPagarService,
    private contaCorrenteService: ContaCorrenteService,
    private centroCustoService: CentroCustoService) {
  }

  ngOnInit() {
    this.formFornecedor = this.formBuilder.group({
      fornecedor: ['', Validators.required]
    });
    this.formProvisao = this.formBuilder.group({
      dataInicial: ['', Validators.required]
    });
    this.onLoadFilters();
  }

  get ff() { return this.formFornecedor.controls; }
  get fp() { return this.formProvisao.controls; }

  onLoadFilters() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    forkJoin(
      this.planoContasService.getByFilter(filter),
      this.fornecedorService.getByFilter(filter),
      this.centroCustoService.getByFilter(filter),
      this.contaCorrenteService.getByFilter(filter),
      this.categoriaContasAPagarService.getByFilter(filter)
    ).subscribe(result => {
      this.lstPlanoContas = result[0];
      this.lstFornecedor = result[1];
      this.lstCentroCusto = result[2];
      this.lstContaCorrente = result[3];
      this.lstCategorias = result[4];
    });
  }

  onResetFormFornecedor() {
    this.formFornecedor.controls.fornecedor.reset();
  }

  onRelFornecedor() {
    this.submittedFornecedor = true;
    if (this.formFornecedor.invalid) {
      return;
    }
    const filter: FilterDefaultModel = new FilterDefaultModel();
    filter.fornecedorId = this.formFornecedor.controls.fornecedor.value.id;
    this.contasAPagarService.relFornecedor(filter).subscribe((data: any) => {
      if (data) {
        this.fileHelper.Download(data, 'application/excel', 'relFornecedor.xlsx');
      } else {
        return this.toastr.info("Nenhuma conta a pagar para o fornecedor!")
      }
    });
  }

  onRelProvisao() {
    this.submittedProvisao = true;
    if (this.formProvisao.invalid) {
      return;
    }
    const filter: FilterDefaultModel = new FilterDefaultModel();
    filter.dataInicial = this.formProvisao.controls.dataInicial.value;
    this.contasAPagarService.relProvisao(filter).subscribe((data: any) => {
      if (data) {
        this.fileHelper.Download(data, 'application/excel', 'relProvisao.xlsx');
      } else {
        return this.toastr.info("Nenhuma provisão encontrada!")
      }

    });
  }

  onOpenCalendar(container) {
    container.monthSelectHandler = (event: any): void => {
      container._store.dispatch(container._actions.select(event.date));
    };
    container.setViewMode('month');
  }

}
