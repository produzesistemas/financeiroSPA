import { NgModule } from '@angular/core';
import { AlterarUsuarioComponent } from './alterar-usuario.component';
import { SharedModule } from 'src/app/shared.module';
import { AlterarUsuarioRoutingModule} from './alterar-usuario-routing.module';

@NgModule({
    imports: [
        SharedModule,
        AlterarUsuarioRoutingModule
      ],
    declarations: [
        AlterarUsuarioComponent
    ],
    exports: [ AlterarUsuarioComponent,
     ]
})
export class AlterarUsuarioModule { }
