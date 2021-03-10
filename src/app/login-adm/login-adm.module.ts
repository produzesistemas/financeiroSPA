import { NgModule } from '@angular/core';
import { LoginAdmComponent } from './login-adm.component';
import { LoginAdmRoutingModule} from './login-adm-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
    imports: [
        CommonModule,
        LoginAdmRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        ModalModule.forRoot()
      ],
    declarations: [
        LoginAdmComponent    ],
    exports: [ LoginAdmComponent ]
})
export class LoginAdmModule { }
