import { NgModule } from '@angular/core';
import { CategoriaContasAPagarComponent } from './categoria-contas-a-pagar.component';
import { SharedModule } from '../shared.module';
import { CategoriaContasAPagarRoutingModule} from './categoria-contas-a-pagar-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        SharedModule,
        CategoriaContasAPagarRoutingModule,
        NgbModule
      ],
    declarations: [
        CategoriaContasAPagarComponent
    ],
    exports: [ CategoriaContasAPagarComponent
     ]
})
export class CategoriaContasAPagarModule { }
