import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Fornecedor } from 'src/app/_model/fornecedor-model';
import { FornecedorService } from 'src/app/_services/fornecedor.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html'
})
export class FornecedorFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public fornecedor: Fornecedor = new Fornecedor();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
      nome: ['',  Validators.required],
      cnpj: ['',  Validators.required],
      contato: [''],
      telefone: [''],
      email: [''],
      criadoPor: [''],
      alteradoPor: [''],
      createDate: [''],
      updateDate: [''],
      id: [0]
      });

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.fornecedor.id = Number(params.id);
          this.load();
        }
      });
    }

    load() {
      if (this.fornecedor.id > 0) {
        this.fornecedorService.get(this.fornecedor.id).subscribe(result => {
          this.fornecedor = result;
          this.loadControls();
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      const fornecedor = new Fornecedor(this.formAdd.value);
      fornecedor.createDate = new Date();
      this.fornecedorService.save(fornecedor).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/fornecedor']);
    });
    }

    onCancel() {
      this.router.navigate([`/fornecedor`]);
    }

    loadControls() {
      this.formAdd.controls.nome.setValue(this.fornecedor.nome);
      this.formAdd.controls.cnpj.setValue(this.fornecedor.cnpj);
      this.formAdd.controls.contato.setValue(this.fornecedor.contato);
      this.formAdd.controls.telefone.setValue(this.fornecedor.telefone);
      this.formAdd.controls.email.setValue(this.fornecedor.email);
      this.formAdd.controls.id.setValue(this.fornecedor.id);
      this.formAdd.controls.criadoPor.setValue(this.fornecedor.criadoPor);
      this.formAdd.controls.alteradoPor.setValue(this.fornecedor.alteradoPor);
    }

    getDataCriacao() {
      return this.fornecedor.createDate;
    }

    getDataAlteracao() {
        if (this.fornecedor.updateDate) {
            return this.fornecedor.updateDate;
        }
      }

}

