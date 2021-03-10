import { NgModule } from '@angular/core';
import { LoginEmpresaComponent } from './login-empresa.component';
import { LoginEmpresaRoutingModule} from './login-empresa-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
    imports: [
        CommonModule,
        LoginEmpresaRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot()
      ],
    declarations: [
        LoginEmpresaComponent    ],
    exports: [ LoginEmpresaComponent ]
})
export class LoginEmpresaModule { }
