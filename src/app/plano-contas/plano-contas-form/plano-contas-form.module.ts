import { NgModule } from '@angular/core';
import { PlanoContasFormComponent } from './plano-contas-form.component';
import { SharedModule } from 'src/app/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        NgxMaskModule.forRoot(options),
      ],
    declarations: [
        PlanoContasFormComponent
    ],
    exports: [ PlanoContasFormComponent,
     ]
})
export class PlanoContasFormModule { }
