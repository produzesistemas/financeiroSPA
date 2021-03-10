import { NgModule } from '@angular/core';
import { PlanoContasComponent } from './plano-contas.component';
import { SharedModule } from '../shared.module';
import { PlanoContasRoutingModule} from './plano-contas-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        SharedModule,
        PlanoContasRoutingModule,
        NgbModule
      ],
    declarations: [
        PlanoContasComponent
    ],
    exports: [ PlanoContasComponent
     ]
})
export class PlanoContasModule { }
