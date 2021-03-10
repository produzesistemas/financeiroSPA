import { NgModule } from '@angular/core';
import { ContaCorrenteComponent } from './conta-corrente.component';
import { SharedModule } from '../shared.module';
import { ContaCorrenteRoutingModule} from './conta-corrente-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        SharedModule,
        ContaCorrenteRoutingModule,
        NgbModule
      ],
    declarations: [
        ContaCorrenteComponent
    ],
    exports: [ ContaCorrenteComponent
     ]
})
export class ContaCorrenteModule { }
