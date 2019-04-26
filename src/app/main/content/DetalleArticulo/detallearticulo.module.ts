// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { DetalleArticuloComponent } from './detallearticulo.component';

import { RouterModule, Routes } from '@angular/router';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSelectModule, MatStepperModule, MatDialogModule, MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { TextMaskModule } from 'angular2-text-mask';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { AdminGuard } from 'app/Guards/AdminGuard';
import { MatCardModule } from '@angular/material';

//import { FuseWidgetDocsComponent } from '../widget/widget.component';

//import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

const routes: Routes = [
    {
        path: 'detallearticulo',
        component: DetalleArticuloComponent
//       , canActivate:[AdminGuard]
    }
  /*  ,
    {
        path     : 'widget',
        component: FuseWidgetDocsComponent
    }*/
];

@NgModule({
    declarations: [
        DetalleArticuloComponent,
      //  FuseWidgetDocsComponent
        
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
        MatCardModule

    ]

})
export class DetalleArticuloModule {

}
