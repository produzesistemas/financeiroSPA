import { NgModule } from '@angular/core';
import { ConfiguracoesComponent } from './configuracoes.component';
import { ConfiguracoesRoutingModule} from './configuracoes-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared.module';
import { IConfig, NgxMaskModule } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
    imports: [
        SharedModule,
        ConfiguracoesRoutingModule,
        NgbModule,
        NgxMaskModule.forRoot(options)
      ],
    declarations: [
        ConfiguracoesComponent
    ],
    exports: [ ConfiguracoesComponent
     ]
})
export class ConfiguracoesModule { }
