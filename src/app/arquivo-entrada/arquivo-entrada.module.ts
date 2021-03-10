import { NgModule } from '@angular/core';
import { ArquivoEntradaComponent } from './arquivo-entrada.component';
import { SharedModule } from '../shared.module';
import { ArquivoEntradaRoutingModule} from './arquivo-entrada-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        SharedModule,
        ArquivoEntradaRoutingModule,
        NgbModule
      ],
    declarations: [
      ArquivoEntradaComponent
    ],
    exports: [ ArquivoEntradaComponent
     ]
})
export class ArquivoEntradaModule { }
