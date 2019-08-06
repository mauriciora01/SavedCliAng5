// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { ModalPopUpPedidoComponent } from './modalpopuppedido.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SpinerComponent } from '../spiner/spiner.component';
//import { AdminGuard } from 'app/Guards/AdminGuard';

const routes: Routes = [
    {
        path: 'modalpopuppedido',
        component: ModalPopUpPedidoComponent
//       , canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        ModalPopUpPedidoComponent,SpinerComponent
        
    ],
    imports: [
        RouterModule.forChild(routes),
        MatProgressSpinnerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        FuseSharedModule,
        TextMaskModule,
        NgxDatatableModule,
        MatCheckboxModule,
        MatToolbarModule

    ]

})
export class ModalPopUpPedidoModule {

}
