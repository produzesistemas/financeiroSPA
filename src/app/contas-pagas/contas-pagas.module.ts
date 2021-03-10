import { NgModule } from '@angular/core';
import { ContasPagasComponent } from './contas-pagas.component';
import { SharedModule } from '../shared.module';
import { ContasPagasRoutingModule} from './contas-pagas-routing.module';
import { NgbDatepickerI18n , NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter, I18n  } from '../_adapters/custom-date-adapter';
import { CustomDateParserFormatter } from '../_adapters/custom-date-parser-formatter-adapter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
    imports: [
        SharedModule,
        ContasPagasRoutingModule,
        NgbModule,
        BsDatepickerModule.forRoot()
      ],
    declarations: [
        ContasPagasComponent
    ],
    exports: [ ContasPagasComponent
     ],
     providers: [
      [I18n, { provide: NgbDatepickerI18n, useClass: CustomDateAdapter }],
      {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
    ]
})
export class ContasPagasModule { }
