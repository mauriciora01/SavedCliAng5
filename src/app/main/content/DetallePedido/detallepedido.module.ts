// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { DetallePedidoComponent } from './detallepedido.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule, MatBottomSheetModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';
import { MatCardModule } from '@angular/material';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";

const routes: Routes = [
    {
        path: 'detallepedido',
        component: DetallePedidoComponent
//       , canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        DetallePedidoComponent
        
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
        MatToolbarModule,
        MatCardModule,
        MatBottomSheetModule,

        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule
    ],    
    exports: [
        DetallePedidoComponent,
    ]


})
export class DetallePedidoModule {

}
