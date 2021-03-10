import { NgModule } from '@angular/core';
import { AreaAdmComponent } from './area-adm.component';
import { AreaAdmRoutingModule} from './area-adm-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        CommonModule,
        AreaAdmRoutingModule
      ],
    declarations: [
        AreaAdmComponent    ],
    exports: [ AreaAdmComponent ]
})
export class AreaAdmModule { }
