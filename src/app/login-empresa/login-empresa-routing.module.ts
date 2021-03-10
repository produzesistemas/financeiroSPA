import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginEmpresaComponent } from './login-empresa.component';

const routes: Routes = [
    {
        path: '',
        component: LoginEmpresaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LoginEmpresaRoutingModule { }
