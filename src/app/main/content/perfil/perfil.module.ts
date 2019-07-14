// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// This Module's Components
import { PerfilComponent } from './perfil.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatStepperModule, MatInputModule, MatButtonModule, MatAutocompleteModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

const routes: Routes = [
    {
        path: 'perfil',
        component: PerfilComponent
//       , canActivate:[AdminGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FormsModule,ReactiveFormsModule,
        MatStepperModule,
        MatInputModule,
        MatButtonModule,
        MatAutocompleteModule,  
       // BrowserModule,
    ],
    declarations: [
        PerfilComponent,
    ],
    exports: [
        PerfilComponent,
    ]
})
export class PerfilModule {


}
