import { NgModule } from '@angular/core';
import { ContasAPagarRelatorioComponent } from './contas-a-pagar-relatorio.component';
import { SharedModule } from 'src/app/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
        NgxMaskModule.forRoot(options)
      ],
    declarations: [
        ContasAPagarRelatorioComponent
    ],
    exports: [ ContasAPagarRelatorioComponent,
     ]
})
export class ContasAPagarRelatorioModule { }
