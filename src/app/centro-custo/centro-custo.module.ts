import { NgModule } from '@angular/core';
import { CentroCustoComponent } from './centro-custo.component';
import { SharedModule } from '../shared.module';
import { CentroCustoRoutingModule} from './centro-custo-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        SharedModule,
        CentroCustoRoutingModule,
        NgbModule
      ],
    declarations: [
        CentroCustoComponent
    ],
    exports: [ CentroCustoComponent
     ]
})
export class CentroCustoModule { }

