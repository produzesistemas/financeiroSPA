import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ContasAPagar } from 'src/app/_model/contas-a-pagar-model';
import { ContasAPagarService } from 'src/app/_services/contas-a-pagar.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { forkJoin } from 'rxjs';
import { FornecedorService } from 'src/app/_services/fornecedor.service';
import { PlanoContasService } from 'src/app/_services/plano-contas.service';
import { ContaCorrenteService } from 'src/app/_services/conta-corrente.service';
import { CentroCustoService } from 'src/app/_services/centro-custo.service';
import { CategoriaContasAPagarService } from 'src/app/_services/categoria-contas-a-pagar.service';

@Component({
  selector: 'app-contas-pagas',
  templateUrl: './contas-pagas.component.html'
})

export class ContasPagasComponent implements OnInit {
  modalDetalhes: BsModalRef;
  form: FormGroup;
  loading = false;
  submitted = false;
  lst = [];
  contasaPagar: any;
  page = 1;
  pageSize = 10;
  public lstFornecedor: any[] = [];
  public lstPlanoContas: any[] = [];
  public lstCentroCusto: any[] = [];
  public lstContaCorrente: any[] = [];
  public lstCategorias: any[] = [];

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private contasAPagarService: ContasAPagarService,
    private router: Router,
    private fornecedorService: FornecedorService,
    private planoContasService: PlanoContasService,
    private contaCorrenteService: ContaCorrenteService,
    private categoriaContasAPagarService: CategoriaContasAPagarService,
    private centroCustoService: CentroCustoService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fornecedor: [''],
      categoriaContasAPagar: [''],
      centroCusto: [''],
      planoContas: ['']
    });

    this.onLoadFilters();
    // this.onSubmit();
  }

  get f() { return this.form.controls; }

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    if (this.form.controls.fornecedor.value) {
      filter.fornecedorId = this.form.controls.fornecedor.value.id;
    }
    this.contasAPagarService.getPagasByFilter(filter).subscribe(
      data => {
        this.lst = data;
      }
    );
  }

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

  onDetails(template: TemplateRef<any>, obj: ContasAPagar) {
    this.contasAPagarService.getById(obj.id).subscribe(result => {
    if (result) {
      this.contasaPagar = result;
      this.modalDetalhes = this.modalService.show(template, { class: 'modal-lg' });
    }
    });
  }

    closeDetalhes() {
      this.modalDetalhes.hide();
      }

      onResetSearch() {
        this.form.controls.fornecedor.reset();
        this.form.controls.categoriaContasAPagar.reset();
        this.form.controls.centroCusto.reset();
        this.form.controls.planoContas.reset();
      }

      goExportacoes() {
        this.router.navigate([`/contas-pagas/contas-pagas-exportacao`]);
      }
}
