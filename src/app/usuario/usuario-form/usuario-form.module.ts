import { NgModule } from '@angular/core';
import { UsuarioFormComponent } from './usuario-form.component';
import { SharedModule } from 'src/app/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        SharedModule,
        NgbModule
      ],
    declarations: [
        UsuarioFormComponent
    ],
    exports: [ UsuarioFormComponent,
     ]
})
export class UsuarioFormModule { }
