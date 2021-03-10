import { NgModule } from '@angular/core';
import { ConversaoComponent } from './conversao.component';
import { SharedModule } from '../shared.module';
import { ConversaoRoutingModule} from './conversao-routing.module';
import { NgbDatepickerI18n , NgbModule, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import { CustomDateAdapter, I18n  } from '../_adapters/custom-date-adapter';
import { CustomDateParserFormatter } from '../_adapters/custom-date-parser-formatter-adapter';

@NgModule({
    imports: [
        SharedModule,
        ConversaoRoutingModule,
        NgbModule
      ],
    declarations: [
        ConversaoComponent
    ],
    exports: [ ConversaoComponent
     ],
    providers: [
        [I18n, { provide: NgbDatepickerI18n, useClass: CustomDateAdapter }],
        {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
        ]
})
export class ConversaoModule { }
