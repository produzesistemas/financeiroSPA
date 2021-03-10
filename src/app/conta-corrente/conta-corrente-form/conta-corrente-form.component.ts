import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContaCorrente } from 'src/app/_model/conta-corrente-model';
import { ContaCorrenteService } from 'src/app/_services/conta-corrente.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-conta-corrente-form',
  templateUrl: './conta-corrente-form.component.html'
})
export class ContaCorrenteFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public contaCorrente: ContaCorrente = new ContaCorrente();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private contaCorrenteService: ContaCorrenteService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
      banco: ['',  Validators.required],
      agencia: ['',  Validators.required],
      conta: ['',  Validators.required],
      bancoNumero: ['',  Validators.required],
      saldoInicial: ['',  Validators.required],
      criadoPor: [''],
      alteradoPor: [''],
      createDate: [''],
      updateDate: [''],
      id: [0]
      });

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.contaCorrente.id = Number(params.id);
          this.load();
        }
      });
    }

    load() {
      if (this.contaCorrente.id > 0) {
        this.contaCorrenteService.get(this.contaCorrente.id).subscribe(result => {
          this.contaCorrente = result;
          this.loadControls();
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      const conta = new ContaCorrente(this.formAdd.value);
      conta.createDate = new Date();
      this.contaCorrenteService.save(conta).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/conta-corrente']);
    });
    }

    onCancel() {
      this.router.navigate([`/conta-corrente`]);
    }

    loadControls() {
      this.formAdd.controls.agencia.setValue(this.contaCorrente.agencia);
      this.formAdd.controls.banco.setValue(this.contaCorrente.banco);
      this.formAdd.controls.conta.setValue(this.contaCorrente.conta);
      this.formAdd.controls.bancoNumero.setValue(this.contaCorrente.bancoNumero);
      this.formAdd.controls.saldoInicial.setValue(this.contaCorrente.saldoInicial);
      this.formAdd.controls.id.setValue(this.contaCorrente.id);
      this.formAdd.controls.criadoPor.setValue(this.contaCorrente.criadoPor);
      this.formAdd.controls.alteradoPor.setValue(this.contaCorrente.alteradoPor);
    }

    getDataCriacao() {
      return this.contaCorrente.createDate;
    }

    getDataAlteracao() {
        if (this.contaCorrente.updateDate) {
            return this.contaCorrente.updateDate;
        }
      }

}

