import { NgModule } from '@angular/core';
import { ContaDeParaFormComponent } from './conta-de-para-form.component';
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
        ContaDeParaFormComponent
    ],
    exports: [ ContaDeParaFormComponent,
     ]
})
export class ContaDeParaFormModule { }
