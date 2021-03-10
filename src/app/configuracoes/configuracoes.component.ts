import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/_model/empresa-model';
import { ConfiguracoesService } from 'src/app/_services/configuracoes.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html'
})
export class ConfiguracoesComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public empresa: Empresa = new Empresa();
  fileToUpload: File = null;
  logo: any;
  public file: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private configuracoesService: ConfiguracoesService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {
    this.formAdd = this.formBuilder.group({
      nome: ['',  Validators.required],
      email: ['',  Validators.required],
      cnpj: ['',  Validators.required],
      nomeUsuarioDominio: ['',  Validators.required],
      codigoFilial: ['',  Validators.required],
      contaTransitoria: [''],
      id: [0]
      });
    this.load();
    }

    load() {
        this.configuracoesService.getByUser().subscribe(result => {
          if (result.nomeImagem) {
            this.logo = environment.urlImagesEmpresas + result.nomeImagem;
          }
          this.formAdd.controls.nome.setValue(result.nome);
          this.formAdd.controls.email.setValue(result.email);
          this.formAdd.controls.email.disable();
          this.formAdd.controls.cnpj.setValue(result.cnpj);
          this.formAdd.controls.cnpj.disable();
          this.formAdd.controls.nomeUsuarioDominio.setValue(result.nomeUsuarioDominio);
          this.formAdd.controls.codigoFilial.setValue(result.codigoFilial);
          this.formAdd.controls.contaTransitoria.setValue(result.contaTransitoria);
          this.formAdd.controls.id.setValue(result.id);
        });
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      const empresa = new Empresa(this.formAdd.value);
      if (this.empresa.id > 0) {
        empresa.id = this.empresa.id;
      }
      const formData = new FormData();
      formData.append('empresa', JSON.stringify(empresa));
      formData.append('file', this.file);
      this.configuracoesService.save(formData).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
    });
    }

    onFileChange(event) {
      if (event.target.files.length > 0) {
        this.file = event.target.files[0];
      }
    }
}

