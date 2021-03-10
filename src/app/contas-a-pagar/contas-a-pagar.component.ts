import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { ContasAPagar } from 'src/app/_model/contas-a-pagar-model';
import { ContasAPagarService } from 'src/app/_services/contas-a-pagar.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterDefaultModel } from '../_model/filter-default-model';
import { forkJoin } from 'rxjs';
import { FornecedorService } from 'src/app/_services/fornecedor.service';
import { PlanoContasService } from 'src/app/_services/plano-contas.service';
import { CategoriaContasAPagarService } from 'src/app/_services/categoria-contas-a-pagar.service';
import { CategoriaContasAPagarPlanoContasService } from 'src/app/_services/categoria-contas-a-pagar-plano-contas.service';
import { ContaCorrenteService } from 'src/app/_services/conta-corrente.service';
import { CentroCustoService } from 'src/app/_services/centro-custo.service';
import { ContasAPagarLancamentoManual } from '../_model/contas-a-pagar-lancamento-manual-model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-contas-a-pagar',
  templateUrl: './contas-a-pagar.component.html'
})

export class ContasAPagarComponent implements OnInit {
  modalRef: BsModalRef;
  modalDelete: BsModalRef;
  modalDetalhes: BsModalRef;
  modalBaixa: BsModalRef;
  formLancManual: FormGroup;
  formBaixa: FormGroup;
  form: FormGroup;
  loading = false;
  submitted = false;
  submittedLancManual = false;
  submittedBaixa = false;
  lst = [];
  public lstQuantidade: any[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  contasaPagar: any;
  page = 1;
  pageSize = 10;
  public lstFornecedor: any[] = [];
  public lstPlanoContas: any[] = [];
  public lstCategorias: any[] = [];
  public lstCentroCusto: any[] = [];
  public lstContaCorrente: any[] = [];
  public lstPlanoContasTemp: any[] = [];

  constructor(
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private authenticationService: AuthenticationService,
    private contasAPagarService: ContasAPagarService,
    private router: Router,
    private fornecedorService: FornecedorService,
    private planoContasService: PlanoContasService,
    private categoriaContasAPagarService: CategoriaContasAPagarService,
    private categoriaContasAPagarPlanoContasService: CategoriaContasAPagarPlanoContasService,
    private contaCorrenteService: ContaCorrenteService,
    private centroCustoService: CentroCustoService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      fornecedor: [''],
      categoriaContasAPagar: [''],
      centroCusto: [''],
      planoContas: ['']
    });

    this.formLancManual = this.formBuilder.group({
      fornecedor: ['',  Validators.required],
      referente: ['',  Validators.required],
      valorOriginal: ['',  Validators.required],
      dataVencimento: ['',  Validators.required],
      quantidade: ['',  Validators.required],
      planoContas: [''],
      centroCusto: [''],
      contaCorrente: [''],
      categoriaContasAPagar: ['']
      });

    this.onLoadFilters();
    // this.onSubmit();
  }

  get f() { return this.form.controls; }
  get fl() { return this.formLancManual.controls; }
  get bx() { return this.formBaixa.controls; }

  onSubmit() {
    const filter: FilterDefaultModel = new FilterDefaultModel();
    if (this.form.controls.fornecedor.value) {
      filter.fornecedorId = this.form.controls.fornecedor.value.id;
    }
    if (this.form.controls.categoriaContasAPagar.value) {
      filter.categoriaContasAPagarId = this.form.controls.categoriaContasAPagar.value.id;
    }
    if (this.form.controls.centroCusto.value) {
      filter.centroCustoId = this.form.controls.centroCusto.value.id;
    }
    if (this.form.controls.planoContas.value) {
      filter.planoContasId = this.form.controls.planoContas.value.id;
    }
    this.contasAPagarService.getByFilter(filter).subscribe(
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
      this.lstPlanoContasTemp = result[0];
      this.lstFornecedor = result[1];
      this.lstCentroCusto = result[2];
      this.lstContaCorrente = result[3];
      this.lstCategorias = result[4];
    });
  }

  onLancManual(template: TemplateRef<any>) {
    this.formLancManual.reset();
    this.formLancManual.controls.quantidade.setValue(1);
    this.modalRef = this.modalService.show(template, { class: 'modal-lg' });
  }

  onSelectCategoria() {
    this.categoriaContasAPagarPlanoContasService.getPlanoContas(this.formLancManual.controls.categoriaContasAPagar.value.id)
    .subscribe(result => {
      if (result.length === 0) {
        this.lstPlanoContas = [];
        this.lstPlanoContas = this.lstPlanoContasTemp;
        return this.toastr.info("Nenhum plano de contas associado a essa categoria!")
      } else {
        this.lstPlanoContas = [];
        this.lstPlanoContas = result.map(x => x.planoContas);
        this.formLancManual.controls.planoContas.setValue(this.lstPlanoContas[0]);
      }
    });
  }

  onBaixa(template: TemplateRef<any>, obj: ContasAPagar) {
    this.formBaixa = this.formBuilder.group({
      valorPago: ['',  Validators.required],
      dataPagamento: ['',  Validators.required],
      planoContas: [''],
      centroCusto: [''],
      contaCorrente: [''],
      fornecedor: [''],
      valorOriginal: [''],
      multa: [''],
      juros: [''],
      id: ['']
      });
    this.contasAPagarService.getById(obj.id).subscribe(result => {
    if (result) {
      this.contasaPagar = result;
      this.formBaixa.controls.fornecedor.setValue(this.lstFornecedor.find(p => p.id === this.contasaPagar.fornecedorId));
      this.formBaixa.controls.fornecedor.disable();
      this.formBaixa.controls.planoContas.setValue(this.lstPlanoContas.find(p => p.id === this.contasaPagar.planoContasId));
      this.formBaixa.controls.centroCusto.setValue(this.lstCentroCusto.find(p => p.id === this.contasaPagar.centroCustoId));
      this.formBaixa.controls.contaCorrente.setValue(this.lstContaCorrente.find(p => p.id === this.contasaPagar.contaCorrenteId));
      this.formBaixa.controls.id.setValue(this.contasaPagar.id);
      this.formBaixa.controls.valorOriginal.setValue(this.contasaPagar.valorOriginal);
      this.formBaixa.controls.valorOriginal.disable();
      this.modalBaixa = this.modalService.show(template, { class: 'modal-lg' });
    }
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

  edit(obj: ContasAPagar) {
    this.router.navigate([`/contas-a-pagar/${obj.id}/1`]);
  }

  goRelatorio() {
    this.router.navigate([`/contas-a-pagar/contas-a-pagar-relatorio`]);
  }

  deleteById(template: TemplateRef<any>, item: ContasAPagar) {
    this.contasaPagar = item;
    this.modalDelete = this.modalService.show(template, { class: 'modal-md' });
  }

  confirmDelete() {
    this.contasAPagarService.deleteById(this.contasaPagar.id).subscribe(() => {
      const index: number = this.lst.indexOf(this.contasaPagar);
      if (index !== -1) {
        this.lst.splice(index, 1);
      }
      this.closeDelete();
      this.toastr.success('Excluído com sucesso!', '');
    });
  }

  onConfirmLancManual() {
    this.submittedLancManual = true;
    if (this.formLancManual.invalid) {
      return;
    }
    const lancamento = new ContasAPagarLancamentoManual(this.formLancManual.value);
    lancamento.dataVencimento = new Date(this.formLancManual.controls.dataVencimento.value.year,
      this.formLancManual.controls.dataVencimento.value.month - 1,
      this.formLancManual.controls.dataVencimento.value.day, 0, 0, 0, 0);
    this.contasAPagarService.lancamentoManual(lancamento).subscribe(result => {
      this.toastr.success('Lançamento efetuado com sucesso!');
      this.closeModalLancManual();
      this.formLancManual.reset();
      this.onSubmit();
  });
  }

  onConfirmBaixa() {
    this.submittedBaixa = true;
    if (this.formBaixa.invalid) {
      return;
    }
    const baixa = new ContasAPagar(this.formBaixa.value);
    baixa.dataPagamento = new Date(this.formBaixa.controls.dataPagamento.value.year,
      this.formBaixa.controls.dataPagamento.value.month - 1,
      this.formBaixa.controls.dataPagamento.value.day, 0, 0, 0, 0);
    if (this.formBaixa.controls.centroCusto.value != undefined) {
      baixa.centroCustoId = this.formBaixa.controls.centroCusto.value.id;
    }
    if (this.formBaixa.controls.planoContas.value != undefined) {
      baixa.planoContasId = this.formBaixa.controls.planoContas.value.id;
    }
    if (this.formBaixa.controls.contaCorrente.value != undefined) {
      baixa.contaCorrenteId = this.formBaixa.controls.contaCorrente.value.id;
    }

    this.contasAPagarService.baixa(baixa).subscribe(result => {
      this.toastr.success('Baixa efetuada com sucesso!');
      this.closeModalBaixa();
      this.formBaixa.reset();
      this.onSubmit();
  });
  }

  closeDelete() {
  this.modalDelete.hide();
  }

  closeModalLancManual() {
    this.modalRef.hide();
  }

  closeModalBaixa() {
      this.modalBaixa.hide();
  }

  closeDetalhes() {
      this.modalDetalhes.hide();
  }

  getTotalGeral() {
    return this.lst.length > 0 ? this.lst.filter(item => item)
    .reduce((sum, current) => sum + current.valorOriginal, 0) : 0;
  }

  onResetSearch() {
    this.form.controls.fornecedor.reset();
    this.form.controls.categoriaContasAPagar.reset();
    this.form.controls.centroCusto.reset();
    this.form.controls.planoContas.reset();
  }

}
