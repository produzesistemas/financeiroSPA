import { NgModule } from '@angular/core';
import { EmpresaComponent } from './empresa.component';
import { EmpresaRoutingModule} from './empresa-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared.module';

@NgModule({
    imports: [
        SharedModule,
        EmpresaRoutingModule,
        NgbModule
      ],
    declarations: [
      EmpresaComponent
    ],
    exports: [ EmpresaComponent
     ]
})
export class EmpresaModule { }
