import { NgModule } from '@angular/core';
import { ContasPagasExportacaoComponent } from './contas-pagas-exportacao.component';
import { SharedModule } from 'src/app/shared.module';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
import { BsDatepickerModule, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbDatepickerI18n , NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter, I18n  } from '../../_adapters/custom-date-adapter';
import { CustomDateParserFormatter } from '../../_adapters/custom-date-parser-formatter-adapter';


@NgModule({
    imports: [
        SharedModule,
        NgbModule,
        BrowserAnimationsModule,
        BsDatepickerModule.forRoot(),
        NgxMaskModule.forRoot(options)
      ],
    declarations: [
        ContasPagasExportacaoComponent
    ],
    exports: [ ContasPagasExportacaoComponent,
     ],
     providers: [
      [I18n, { provide: NgbDatepickerI18n, useClass: CustomDateAdapter }],
      {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
      ]
})
export class ContasPagasExportacaoModule { }
