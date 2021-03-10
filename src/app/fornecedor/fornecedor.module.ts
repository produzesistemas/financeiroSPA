import { NgModule } from '@angular/core';
import { FornecedorComponent } from './fornecedor.component';
import { SharedModule } from '../shared.module';
import { FornecedorRoutingModule} from './fornecedor-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        SharedModule,
        FornecedorRoutingModule,
        NgbModule
      ],
    declarations: [
        FornecedorComponent
    ],
    exports: [ FornecedorComponent
     ]
})
export class FornecedorModule { }
