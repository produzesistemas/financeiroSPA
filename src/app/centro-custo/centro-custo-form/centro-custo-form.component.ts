import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CentroCusto } from 'src/app/_model/centro-custo-model';
import { CentroCustoService } from 'src/app/_services/centro-custo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-centro-custo-form',
  templateUrl: './centro-custo-form.component.html'
})
export class CentroCustoFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public centroCusto: CentroCusto = new CentroCusto();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private centroCustoService: CentroCustoService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
      descricao: ['',  Validators.required],
      codigo: ['',  Validators.required],
      criadoPor: [''],
      alteradoPor: [''],
      createDate: [''],
      updateDate: [''],
      id: [0]
      });

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.centroCusto.id = Number(params.id);
          this.load();
        }
      });
    }

    load() {
      if (this.centroCusto.id > 0) {
        this.centroCustoService.get(this.centroCusto.id).subscribe(result => {
          this.centroCusto = result;
          this.loadControls();
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      const entity = new CentroCusto(this.formAdd.value);
      entity.createDate = new Date();
      this.centroCustoService.save(entity).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/centro-custo']);
    });
    }

    onCancel() {
      this.router.navigate([`/centro-custo`]);
    }

    loadControls() {
      this.formAdd.controls.descricao.setValue(this.centroCusto.descricao);
      this.formAdd.controls.codigo.setValue(this.centroCusto.codigo);
      this.formAdd.controls.id.setValue(this.centroCusto.id);
      this.formAdd.controls.criadoPor.setValue(this.centroCusto.criadoPor);
      this.formAdd.controls.alteradoPor.setValue(this.centroCusto.alteradoPor);
    }

    getDataCriacao() {
      return this.centroCusto.createDate;
    }

    getDataAlteracao() {
        if (this.centroCusto.updateDate) {
            return this.centroCusto.updateDate;
        }
      }

}

