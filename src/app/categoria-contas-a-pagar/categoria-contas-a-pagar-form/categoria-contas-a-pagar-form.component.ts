import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriaContasAPagar } from 'src/app/_model/categoria-contas-a-pagar-model';
import { CategoriaContasAPagarService } from 'src/app/_services/categoria-contas-a-pagar.service';
import { ToastrService } from 'ngx-toastr';
import { PlanoContasService } from 'src/app/_services/plano-contas.service';
import { FilterDefaultModel } from 'src/app/_model/filter-default-model';
import { CategoriaContasAPagarPlanoContas } from 'src/app/_model/categoria-contas-a-pagar-plano-contas-model';

@Component({
  selector: 'app-categoria-contas-a-pagar-form',
  templateUrl: './categoria-contas-a-pagar-form.component.html'
})
export class CategoriaContasAPagarFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public categoriaContasAPagar: CategoriaContasAPagar = new CategoriaContasAPagar();
  page = 1;
  pageSize = 5;
  lst = [];
  lstPlanoContas = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private planocontasService: PlanoContasService,
    private categoriaContasAPagarService: CategoriaContasAPagarService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
      nome: ['',  Validators.required],
      planoContas: [''],
      id: [0]
      });

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.categoriaContasAPagar.id = Number(params.id);
          this.load();
        }
      });
    const filter: FilterDefaultModel = new FilterDefaultModel();
    this.planocontasService.getByFilter(filter).subscribe(
        data => {
          this.lstPlanoContas = data;
        }
      );
    }

    load() {
      if (this.categoriaContasAPagar.id > 0) {
        this.categoriaContasAPagarService.get(this.categoriaContasAPagar.id).subscribe(result => {
          this.categoriaContasAPagar = result;
          this.loadControls();
        });
      }
    }

    onSelectPlanoContas() {
      const c = new CategoriaContasAPagarPlanoContas();
      c.planoContasId = this.formAdd.controls.planoContas.value.id;
      c.planoContas = this.formAdd.controls.planoContas.value;
      this.categoriaContasAPagar.contas.push(c);
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      this.categoriaContasAPagar.nome = this.formAdd.controls.nome.value;
      this.categoriaContasAPagarService.save(this.categoriaContasAPagar).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/categoria-contas-a-pagar']);
    });
    }

    onCancel() {
      this.router.navigate([`/categoria-contas-a-pagar`]);
    }

    loadControls() {
      this.formAdd.controls.nome.setValue(this.categoriaContasAPagar.nome);
      this.formAdd.controls.id.setValue(this.categoriaContasAPagar.id);
    }

    getDataCriacao() {
      return this.categoriaContasAPagar.createDate;
    }

    getDataAlteracao() {
        if (this.categoriaContasAPagar.updateDate) {
            return this.categoriaContasAPagar.updateDate;
        }
      }

    deleteRow(item) {
      const index: number = this.categoriaContasAPagar.contas.indexOf(item);
      this.categoriaContasAPagar.contas.splice(index, 1);
    }
}

