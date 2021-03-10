import { NgModule } from '@angular/core';
import { ContaCorrenteFormComponent } from './conta-corrente-form.component';
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
        ContaCorrenteFormComponent
    ],
    exports: [ ContaCorrenteFormComponent,
     ]
})
export class ContaCorrenteFormModule { }
