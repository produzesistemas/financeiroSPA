import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContasAPagar } from 'src/app/_model/contas-a-pagar-model';
import { ContasAPagarService } from 'src/app/_services/contas-a-pagar.service';
import { ToastrService } from 'ngx-toastr';
import { FornecedorService } from 'src/app/_services/fornecedor.service';
import { PlanoContasService } from 'src/app/_services/plano-contas.service';
import { CategoriaContasAPagarService } from 'src/app/_services/categoria-contas-a-pagar.service';
import { ContaCorrenteService } from 'src/app/_services/conta-corrente.service';
import { CentroCustoService } from 'src/app/_services/centro-custo.service';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';
import { forkJoin } from 'rxjs';
import { CategoriaContasAPagarPlanoContasService } from 'src/app/_services/categoria-contas-a-pagar-plano-contas.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-contas-a-pagar-form',
  templateUrl: './contas-a-pagar-form.component.html'
})
export class ContasAPagarFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public contasAPagar: ContasAPagar = new ContasAPagar();
  public lstFornecedor: any[] = [];
  public lstPlanoContas: any[] = [];
  public lstCategorias: any[] = [];
  public lstCentroCusto: any[] = [];
  public lstContaCorrente: any[] = [];
  public lstPlanoContasTemp: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private contasAPagarService: ContasAPagarService,
    private fornecedorService: FornecedorService,
    private planoContasService: PlanoContasService,
    private categoriaContasAPagarService: CategoriaContasAPagarService,
    private categoriaContasAPagarPlanoContasService: CategoriaContasAPagarPlanoContasService,
    private contaCorrenteService: ContaCorrenteService,
    private centroCustoService: CentroCustoService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
        fornecedor: ['',  Validators.required],
        referente: ['',  Validators.required],
        valorOriginal: ['',  Validators.required],
        dataVencimento: ['',  Validators.required],
        planoContas: [''],
        centroCusto: [''],
        contaCorrente: [''],
        categoriaContasAPagar: [''],
        id: [0]
      });

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.contasAPagar.id = Number(params.id);
          this.load();
        }
      });
    }

    load() {
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
          if (this.contasAPagar.id > 0) {
            this.contasAPagarService.getById(this.contasAPagar.id).subscribe(result => {
              this.contasAPagar = result;
              this.loadControls();
            });
          }
        });

    }

    onSelectCategoria() {
        this.categoriaContasAPagarPlanoContasService.getPlanoContas(this.formAdd.controls.categoriaContasAPagar.value.id)
        .subscribe(result => {
          if (result.length === 0) {
            this.lstPlanoContas = [];
            this.lstPlanoContas = this.lstPlanoContasTemp;
            return this.toastr.info("Nenhum plano de contas associado a essa categoria!")
          } else {
            this.lstPlanoContas = [];
            this.lstPlanoContas = result.map(x => x.planoContas);
            this.formAdd.controls.planoContas.setValue(this.lstPlanoContas[0]);
          }
        });
      }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      const conta = new ContasAPagar();
      conta.id = this.formAdd.controls.id.value;
      conta.categoriaContasAPagarId = this.formAdd.controls.categoriaContasAPagar.value.id || 0;
      conta.centroCustoId = this.formAdd.controls.centroCusto.value.id || 0;
      conta.contaCorrenteId = this.formAdd.controls.contaCorrente.value.id || 0;
      conta.dataVencimento = new Date(this.formAdd.controls.dataVencimento.value.year,
        this.formAdd.controls.dataVencimento.value.month - 1,
        this.formAdd.controls.dataVencimento.value.day, 0, 0, 0, 0);
      conta.fornecedorId = this.formAdd.controls.fornecedor.value.id || 0;
      conta.planoContasId = this.formAdd.controls.planoContas.value.id || 0;
      conta.referente = this.formAdd.controls.referente.value;
      conta.valorOriginal = this.formAdd.controls.valorOriginal.value;
      this.contasAPagarService.save(conta).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/contas-a-pagar']);
    });
    }

    onCancel() {
      this.router.navigate([`/contas-a-pagar`]);
    }

    loadControls() {
        this.formAdd.controls.planoContas.setValue(this.lstPlanoContas.find(p => p.id === this.contasAPagar.planoContasId));
        this.formAdd.controls.centroCusto.setValue(this.lstCentroCusto.find(p => p.id === this.contasAPagar.centroCustoId));
        this.formAdd.controls.contaCorrente.setValue(this.lstContaCorrente.find(p => p.id === this.contasAPagar.contaCorrenteId));
        this.formAdd.controls.categoriaContasAPagar.setValue(this.lstCategorias.find(p => p.id === this.contasAPagar.categoriaContasAPagarId));
        this.formAdd.controls.id.setValue(this.contasAPagar.id);
        this.formAdd.controls.fornecedor.setValue(this.lstFornecedor.find(p => p.id === this.contasAPagar.fornecedorId));
        this.formAdd.controls.referente.setValue(this.contasAPagar.referente);
        this.formAdd.controls.valorOriginal.setValue(this.contasAPagar.valorOriginal);
        const dt = new Date(this.contasAPagar.dataVencimento);
        const ngbDate = new NgbDate(dt.getFullYear(), dt.getMonth() + 1, dt.getDate());
        this.formAdd.controls.dataVencimento.setValue(ngbDate);
    }

    getDataCriacao() {
      return this.contasAPagar.createDate;
    }

    getDataAlteracao() {
        if (this.contasAPagar.updateDate) {
            return this.contasAPagar.updateDate;
        }
      }

}

