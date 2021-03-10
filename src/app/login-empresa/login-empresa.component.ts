import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { LoginUser } from 'src/app/_model/login-user-model';

@Component({
    selector: 'app-login-empresa',
    templateUrl: './login-empresa.component.html'
})

export class LoginEmpresaComponent implements OnInit {
    form: FormGroup;
    public submitted = false;
    public loginUser: LoginUser = new LoginUser();

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            secret: ['', Validators.required]
        });
        if (this.authenticationService.getCurrentUser()) {
            return this.router.navigate(['/dashboard']);
        }
    }

    get f() { return this.form.controls; }

    onLogin() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }
        this.loginUser.email = this.form.controls.email.value;
        this.loginUser.secret = this.form.controls.secret.value;
        this.authenticationService.loginEmpresa(this.loginUser)
        .subscribe(result => {
            this.authenticationService.clearUser();
            this.authenticationService.addCurrenUser(result);
            return this.router.navigate(['/dashboard']);
        });
    }

}

