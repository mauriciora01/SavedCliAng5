// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { PedidosPrincipalComponent } from './pedidosprincipal.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';

import { CdkTableModule } from '@angular/cdk/table';

import { MatPaginatorModule, MatSortModule, MatTableModule } from "@angular/material";

import { DigitOnlyModule } from '@uiowa/digit-only'; //para textbox solo numeros


import { MatAutocompleteModule } from '@angular/material/autocomplete';

const routes: Routes = [
    {
        path: 'pedidosprincipal',
        component: PedidosPrincipalComponent
        //       , canActivate:[AdminGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),

        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        MatStepperModule,
        MatDialogModule,
        FuseSharedModule,
        TextMaskModule,
        MatCheckboxModule,

        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        CdkTableModule,


        DigitOnlyModule,

        MatAutocompleteModule

    ],
    declarations: [
        PedidosPrincipalComponent,
    ],
    exports: [
        PedidosPrincipalComponent,
    ]

})
export class PedidosPrincipalModule {

}
