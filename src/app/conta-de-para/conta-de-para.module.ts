import { NgModule } from '@angular/core';
import { ContaDeParaComponent } from './conta-de-para.component';
import { SharedModule } from '../shared.module';
import { ContaDeParaRoutingModule} from './conta-de-para-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        SharedModule,
        ContaDeParaRoutingModule,
        NgbModule
      ],
    declarations: [
        ContaDeParaComponent
    ],
    exports: [ ContaDeParaComponent
     ]
})
export class ContaDeParaModule { }
