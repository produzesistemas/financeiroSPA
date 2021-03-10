import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArquivoEntrada } from 'src/app/_model/arquivo-entrada-model';
import { ArquivoEntradaService } from 'src/app/_services/arquivo-entrada.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-arquivo-entrada-form',
  templateUrl: './arquivo-entrada-form.component.html'
})
export class ArquivoEntradaFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public arquivoEntrada: ArquivoEntrada = new ArquivoEntrada();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private arquivoEntradaService: ArquivoEntradaService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
      descricao: ['',  Validators.required],
      colunaData: ['',  Validators.required],
      colunaHistorico: ['',  Validators.required],
      colunaValorDebito: [null],
      colunaContaDebito: [null],
      colunaValorCredito: [null],
      colunaContaCredito: [null],
      colunaNLancamento: ['',  Validators.required],
      contaTransitoria: [''],
      isDebito: [false,  Validators.required],
      isCredito: [false,  Validators.required],
      hasMapeamento: [false,  Validators.required],
      id: [0]
      });

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.arquivoEntrada.id = Number(params.id);
          this.load();
        }
      });
    }

    load() {
      if (this.arquivoEntrada.id > 0) {
        this.arquivoEntradaService.get(this.arquivoEntrada.id).subscribe(result => {
          this.arquivoEntrada = result;
          this.loadControls();
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      const arquivoEntrada = new ArquivoEntrada(this.formAdd.value);
      this.arquivoEntradaService.save(arquivoEntrada).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/arquivo-entrada']);
    });
    }

    onCancel() {
      this.router.navigate([`/arquivo-entrada`]);
    }

    loadControls() {
      this.formAdd.controls.descricao.setValue(this.arquivoEntrada.descricao);
      this.formAdd.controls.colunaData.setValue(this.arquivoEntrada.colunaData);
      this.formAdd.controls.colunaHistorico.setValue(this.arquivoEntrada.colunaHistorico);
      this.formAdd.controls.colunaValorDebito.setValue(this.arquivoEntrada.colunaValorDebito);
      this.formAdd.controls.colunaContaDebito.setValue(this.arquivoEntrada.colunaContaDebito);
      this.formAdd.controls.colunaValorCredito.setValue(this.arquivoEntrada.colunaValorCredito);
      this.formAdd.controls.colunaContaCredito.setValue(this.arquivoEntrada.colunaContaCredito);
      this.formAdd.controls.colunaNLancamento.setValue(this.arquivoEntrada.colunaNLancamento);
      this.formAdd.controls.contaTransitoria.setValue(this.arquivoEntrada.contaTransitoria);
      this.formAdd.controls.id.setValue(this.arquivoEntrada.id);
      this.formAdd.controls.isCredito.setValue(this.arquivoEntrada.isCredito);
      this.formAdd.controls.isDebito.setValue(this.arquivoEntrada.isDebito);
      this.formAdd.controls.hasMapeamento.setValue(this.arquivoEntrada.hasMapeamento);
    }



}

