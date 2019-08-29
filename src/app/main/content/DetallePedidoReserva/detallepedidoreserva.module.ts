// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { DetallePedidoReservaComponent } from './detallepedidoreserva.component';

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

import { BrowserModule } from '@angular/platform-browser';

import { AgGridModule } from 'ag-grid-angular';
import { FuseContentModule } from '../content.module';

const routes: Routes = [
    {
        path: 'detallepedidoreserva',
        component: DetallePedidoReservaComponent
//       , canActivate:[AdminGuard]
    }
];

@NgModule({
    declarations: [
        DetallePedidoReservaComponent
      
        
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
        BrowserModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule, AgGridModule.withComponents([])
    ],    
    exports: [
        DetallePedidoReservaComponent
       
    ],entryComponents: [
        
      ],


})
export class DetallePedidoReservaModule {

}
