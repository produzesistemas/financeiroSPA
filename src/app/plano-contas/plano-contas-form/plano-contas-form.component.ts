import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PlanoContas } from 'src/app/_model/plano-contas-model';
import { PlanoContasService } from 'src/app/_services/plano-contas.service';
import { TipoContaService } from 'src/app/_services/tipo-conta.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-plano-contas-form',
  templateUrl: './plano-contas-form.component.html'
})
export class PlanoContasFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public planoContas: PlanoContas = new PlanoContas();
  public tipos: any[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private planoContasService: PlanoContasService,
    private tipoContaService: TipoContaService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
      descricao: ['', Validators.required],
      classificacao: ['', Validators.required],
      criadoPor: [''],
      alteradoPor: [''],
      createDate: [''],
      updateDate: [''],
      tipoConta: ['', Validators.required],
      id: [0]
    });

    this.route.params.subscribe(params => {
      if (params.id > 0) {
        this.planoContas.id = Number(params.id);
      }
    });
    this.load();
  }

  load() {
    if (this.planoContas.id !== undefined) {
      forkJoin(
        this.planoContasService.getById(this.planoContas.id),
        this.tipoContaService.getAll()
      ).subscribe(result => {
        this.planoContas = result[0];
        this.tipos = result[1];
        this.loadControls();
      });
    }

    if (this.planoContas.id === undefined) {
      this.tipoContaService.getAll().subscribe(result => {
        this.tipos = result;
      });
    }
  }



  onSave() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      return;
    }
    const planoContas = new PlanoContas(this.formAdd.value);
    planoContas.createDate = new Date();
    planoContas.tipoContaId = this.formAdd.controls.tipoConta.value.id;

    this.planoContasService.save(planoContas).subscribe(result => {
      this.toastr.success('Registro efetuado com sucesso!');
      this.router.navigate(['/plano-contas']);
    });
  }

  onCancel() {
    this.router.navigate([`/plano-contas`]);
  }

  loadControls() {
    this.formAdd.controls.descricao.setValue(this.planoContas.descricao);
    this.formAdd.controls.classificacao.setValue(this.planoContas.classificacao);
    this.formAdd.controls.id.setValue(this.planoContas.id);
    this.formAdd.controls.criadoPor.setValue(this.planoContas.criadoPor);
    this.formAdd.controls.alteradoPor.setValue(this.planoContas.alteradoPor);
    this.formAdd.controls.tipoConta.setValue(this.tipos.find(x => x.id === this.planoContas.tipoConta.id));
  }

  getDataCriacao() {
    return this.planoContas.createDate;
  }

  getDataAlteracao() {
    if (this.planoContas.updateDate) {
      return this.planoContas.updateDate;
    }
  }

}

