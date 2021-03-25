import { NgModule } from '@angular/core';
import { ContasAPagarXMLComponent } from './contas-a-pagar-xml.component';
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
        ContasAPagarXMLComponent
    ],
    exports: [ ContasAPagarXMLComponent,
     ]
})
export class ContasAPagarXMLModule { }
