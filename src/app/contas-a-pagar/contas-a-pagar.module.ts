import { NgModule } from '@angular/core';
import { ContasAPagarComponent } from './contas-a-pagar.component';
import { SharedModule } from '../shared.module';
import { ContasAPagarRoutingModule} from './contas-a-pagar-routing.module';
import { NgbDatepickerI18n , NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter, I18n  } from '../_adapters/custom-date-adapter';
import { CustomDateParserFormatter } from '../_adapters/custom-date-parser-formatter-adapter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
    imports: [
        SharedModule,
        ContasAPagarRoutingModule,
        NgbModule,
        BsDatepickerModule.forRoot()
      ],
    declarations: [
        ContasAPagarComponent
    ],
    exports: [ ContasAPagarComponent
     ],
     providers: [
      [I18n, { provide: NgbDatepickerI18n, useClass: CustomDateAdapter }],
      {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
    ]
})
export class ContasAPagarModule { }
