import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Empresa } from 'src/app/_model/empresa-model';
import { EmpresaService } from 'src/app/_services/empresa.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Modulo } from 'src/app/_model/modulo-model';

@Component({
  selector: 'app-empresa-form',
  templateUrl: './empresa-form.component.html'
})
export class EmpresaFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public empresa: Empresa = new Empresa();
  public modulos: Modulo[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private empresaService: EmpresaService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.route.params.subscribe(params => {
        if (params.id > 0) {
          this.empresa.id = Number(params.id);
        }
      });
    this.formAdd = this.formBuilder.group({
      nome: ['',  Validators.required],
      email: ['',  Validators.required],
      cnpj: ['',  Validators.required],
      nomeUsuarioDominio: [''],
      codigoFilial: [''],
      contaTransitoria: [''],
      modulo: ['',  Validators.required],
      id: [0]
      });

      this.authenticationService.getAllRoles().subscribe(result => {
        this.modulos = result;
      });

    this.load();
    }

    load() {
      if (this.empresa.id > 0) {
        this.empresaService.getById(this.empresa.id).subscribe(result => {
          this.formAdd.controls.nome.setValue(result.nome);
          this.formAdd.controls.email.setValue(result.email);
          this.formAdd.controls.email.disable();
          this.formAdd.controls.cnpj.setValue(result.cnpj);
          this.formAdd.controls.nomeUsuarioDominio.setValue(result.nomeUsuarioDominio);
          this.formAdd.controls.codigoFilial.setValue(result.codigoFilial);
          this.formAdd.controls.id.setValue(result.id);
        });
      }
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      const empresa = new Empresa(this.formAdd.value);
      empresa.modulos = this.formAdd.controls.modulo.value;
      if (this.empresa.id > 0) {
        empresa.id = this.empresa.id;
      }

      this.empresaService.save(empresa).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/empresa']);
    });
    }

    onCancel() {
      this.router.navigate([`/empresa`]);
    }

    toggle(rowData: any) {
      // let allEqual = true;
      // // this.hasSelected = false;
      // this.modulos.forEach(row => {
      //   if (row.isSelected) {
      //     this.hasSelected = true;
      //   }
      //   if (rowData.isSelected !== row.isSelected) {
      //     allEqual = false;
      //     return false;
      //   }
      // });
      // if (allEqual) {
      //   allEqual = rowData.isSelected;
      // }
      // this.selectAll.nativeElement.checked = allEqual;
    }



}

