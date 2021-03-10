import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContaDePara } from 'src/app/_model/conta-de-para-model';
import { ContaDeParaService } from 'src/app/_services/conta-de-para.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-conta-de-para-form',
  templateUrl: './conta-de-para-form.component.html'
})
export class ContaDeParaFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public contaDePara: ContaDePara = new ContaDePara();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private contaDeParaService: ContaDeParaService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
      de: ['',  Validators.required],
      para: ['',  Validators.required],
      criadoPor: [''],
      dataCriacao: [''],
      id: [0]
      });

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.contaDePara.id = Number(params.id);
          this.load();
        }
      });
    }

    load() {
      if (this.contaDePara.id > 0) {
        this.contaDeParaService.get(this.contaDePara.id).subscribe(result => {
          this.contaDePara = result;
          this.loadControls();
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      const conta = new ContaDePara(this.formAdd.value);
      conta.createDate = new Date();
      this.contaDeParaService.save(conta).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/conta-de-para']);
    });
    }

    onCancel() {
      this.router.navigate([`/conta-de-para`]);
    }

    loadControls() {
      this.formAdd.controls.de.setValue(this.contaDePara.de);
      this.formAdd.controls.para.setValue(this.contaDePara.para);
      this.formAdd.controls.id.setValue(this.contaDePara.id);
      this.formAdd.controls.criadoPor.setValue(this.contaDePara.criadoPor);
      this.formAdd.controls.para.setValue(this.contaDePara.para);
    }

    getDataCriacao() {
      return this.contaDePara.createDate;
    }

    getDataAlteracao() {
      if (this.contaDePara.updateDate) {
          return this.contaDePara.updateDate;
      }
    }

}

