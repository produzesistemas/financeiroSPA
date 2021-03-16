import { NgModule } from '@angular/core';
import { UsuarioComponent } from './usuario.component';
import { SharedModule } from '../shared.module';
import { UsuarioRoutingModule} from './usuario-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    imports: [
        SharedModule,
        UsuarioRoutingModule,
        NgbModule
      ],
    declarations: [
        UsuarioComponent
    ],
    exports: [ UsuarioComponent
     ]
})
export class UsuarioModule { }
