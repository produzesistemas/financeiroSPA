import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginUser } from 'src/app/_model/login-user-model';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent implements OnInit {
  formAdd: FormGroup;
  submitted = false;
  public loginUser: LoginUser = new LoginUser();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) { }

  get f() { return this.formAdd.controls; }

  ngOnInit() {

    this.formAdd = this.formBuilder.group({
      email: ['',  Validators.required],
      id: [0]
      });
    }

    onSave() {
      this.submitted = true;
      if (this.formAdd.invalid) {
        return;
      }
      const loginUser = new LoginUser();
      loginUser.email = this.formAdd.controls.email.value;
      this.authenticationService.register(loginUser).subscribe(result => {
        this.toastr.success('Registro efetuado com sucesso!');
        this.router.navigate(['/usuario']);
    });
    }

    onCancel() {
      this.router.navigate([`/usuario`]);
    }

}

