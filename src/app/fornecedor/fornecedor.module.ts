import { NgModule } from '@angular/core';
import { FornecedorComponent } from './fornecedor.component';
import { SharedModule } from '../shared.module';
import { FornecedorRoutingModule} from './fornecedor-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;
@NgModule({
    imports: [
        SharedModule,
        FornecedorRoutingModule,
        NgbModule,
        NgxMaskModule.forRoot(options),
      ],
    declarations: [
        FornecedorComponent
    ],
    exports: [ FornecedorComponent
     ]
})
export class FornecedorModule { }
